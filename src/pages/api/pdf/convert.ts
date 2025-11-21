import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { promisify } from "util";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToSupabase } from "@/lib/supabase";
import { Document, Packer, Paragraph } from "docx";
import { PdfReader } from "pdfreader";
import { convertWithLibreOffice } from "@/lib/libreoffice";
import FormData from "form-data";
import axios from "axios";

const readFile = promisify(fs.readFile);

const planFileLimits: Record<string, number> = {
  FREE: 10 * 1024 * 1024,
  PLUS: 100 * 1024 * 1024,
  PRO: 500 * 1024 * 1024,
};

export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user.email)
    return res.status(401).json({ error: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return res.status(404).json({ error: "User not found" });

  const form = formidable({ multiples: false });
  const data = await new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) =>
      err ? reject(err) : resolve({ fields, files })
    );
  });

  const uploadedFile = data.files.file;
  const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;
  const rawFormat = data.fields.format as string | string[];
  const targetFormat = Array.isArray(rawFormat)
    ? rawFormat[0]?.toLowerCase()
    : rawFormat?.toLowerCase();

  if (!file || !targetFormat)
    return res.status(400).json({ error: "Missing file or target format" });

  const maxSize = planFileLimits[user.plan] || planFileLimits.FREE;
  if (file.size > maxSize) {
    return res.status(400).json({
      error: `File too large for your plan (${maxSize / 1024 / 1024} MB max)`,
    });
  }

  const buffer = await readFile(file.filepath);
  const mimetype = file.mimetype || "";
  let outputBuffer: Buffer;
  const outputFilename = `converted.${targetFormat}`;

  try {
    // --------- PDF to DOCX via Python microservice ---------
    if (mimetype.includes("pdf") && targetFormat === "docx") {
      const formData = new FormData();
      formData.append(
        "file",
        fs.createReadStream(file.filepath),
        file.originalFilename ?? "upload.pdf"
      );

      console.log("Sending file:", file.originalFilename, "size:", file.size);

      try {
        const response = await axios.post(
          "http://localhost:5001/convert/pdf2docx",
          formData,
          {
            headers: formData.getHeaders(),
            responseType: "arraybuffer",
          }
        );

        outputBuffer = Buffer.from(response.data);
      } catch (error: any) {
        console.error(
          "Python service response:",
          error.response?.data || error.message
        );
        throw new Error(
          `Python service error: ${error.response?.status || 500} ${
            error.response?.statusText || ""
          }`
        );
      }

      // --------- PDF to TXT (text-only extraction) ---------
    } else if (mimetype.includes("pdf") && targetFormat === "txt") {
      let text = "";
      await new Promise<void>((resolve, reject) => {
        new PdfReader().parseBuffer(buffer, (err, item) => {
          if (err) reject(err);
          else if (!item) resolve();
          else if (item.text) text += item.text + "\n";
        });
      });
      outputBuffer = Buffer.from(text.trim(), "utf-8");

      // --------- TXT to DOCX/PDF and DOCX to PDF/TXT via LibreOffice ---------
    } else if (
      (mimetype.includes("text/plain") &&
        ["docx", "pdf"].includes(targetFormat)) ||
      (mimetype.includes("word") &&
        ["pdf", "txt", "docx"].includes(targetFormat)) ||
      (mimetype.includes("application/pdf") && targetFormat === "pdf")
    ) {
      const convertedFilePath = await convertWithLibreOffice(
        file.filepath,
        targetFormat
      );
      outputBuffer = await fs.promises.readFile(convertedFilePath);

      // --------- TXT to DOCX fallback ---------
    } else if (mimetype.includes("text/plain") && targetFormat === "docx") {
      const text = buffer.toString("utf-8");
      const doc = new Document({
        sections: [{ children: [new Paragraph(text)] }],
      });
      outputBuffer = await Packer.toBuffer(doc);

      // --------- Unsupported conversion ---------
    } else {
      return res
        .status(400)
        .json({ error: "Unsupported file/format conversion" });
    }
  } catch (error: any) {
    console.error("Conversion error:", error);
    return res.status(500).json({ error: error.message || "Conversion error" });
  }

  if (user.basicCredits <= 0) {
    return res.status(403).json({ error: "No credits left" });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { basicCredits: user.basicCredits - 1 },
  });

  if (user.plan === "FREE") {
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${outputFilename}"`
    );
    return res.send(outputBuffer);
  } else {
    const fileURL = await uploadToSupabase(
      outputBuffer,
      outputFilename,
      targetFormat as "pdf" | "converted" | "bg-removed"
    );
    await prisma.file.create({
      data: {
        name: file.originalFilename ?? outputFilename,
        type: mimetype,
        size: file.size,
        url: fileURL,
        userId: user.id,
        status: "PROCESSED",
      },
    });
    return res.status(200).json({ url: fileURL });
  }
}

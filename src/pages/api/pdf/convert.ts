import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { promisify } from "util";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToSupabase } from "@/lib/supabase";
import pdfParseMod from "pdf-parse";
import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph, TextRun } from "docx";

const readFile = promisify(fs.readFile);
const pdfParse = pdfParseMod as unknown as (
  buffer: Buffer
) => Promise<{ text: string }>;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const form = formidable({ multiples: false });
  const data = await new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  const uploadedFile = data.files.file;
  const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;
  const rawFormat = data.fields.format as string | string[];
  const targetFormat = Array.isArray(rawFormat)
    ? rawFormat[0]?.toLowerCase()
    : rawFormat?.toLowerCase();

  if (!file || !targetFormat) {
    return res.status(400).json({ error: "Missing file or target format" });
  }

  const buffer = await readFile(file.filepath);
  const mimetype = file.mimetype || "";

  let outputBuffer: Buffer;
  let outputFilename = `converted.${targetFormat}`;

  try {
    // --------- PDF to TXT ---------
    if (mimetype.includes("pdf") && targetFormat === "docx") {
      const data = await pdfParse(buffer);
      outputBuffer = Buffer.from(data.text.trim(), "utf-8");

      // --------- PDF to DOCX ---------
    } else if (mimetype.includes("pdf") && targetFormat === "docx") {
      const data = await pdfParse(buffer);
      const doc = new Document({
        sections: [
          {
            children: [new Paragraph(data.text.trim())],
          },
        ],
      });
      outputBuffer = await Packer.toBuffer(doc);

      // --------- TXT to PDF ---------
    } else if (mimetype.includes("text/plain") && targetFormat === "pdf") {
      const text = buffer.toString("utf-8");
      const pdfDoc = new PDFDocument();
      const stream = pdfDoc.pipe(fs.createWriteStream("/tmp/temp.pdf"));
      pdfDoc.fontSize(12).text(text);
      pdfDoc.end();
      await new Promise<void>((resolve) => {
        stream.on("finish", resolve);
      });
      outputBuffer = await readFile("/tmp/temp/pdf");

      // --------- TXT to DOCX ---------
    } else if (mimetype.includes("text/plain") && targetFormat === "docx") {
      const text = buffer.toString("utf-8");
      const doc = new Document({
        sections: [
          {
            children: [new Paragraph(text)],
          },
        ],
      });
      outputBuffer = await Packer.toBuffer(doc);

      // --------- DOCX to PDF (future) ---------
    } else if (mimetype.includes("word") && targetFormat === "pdf") {
      return res.status(501).json({ error: "DOCX to PDF not implemented" });
    } else {
      return res
        .status(400)
        .json({ error: "Unsupported file/format conversion" });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Conversion error" });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.plan === "FREE") {
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${outputFilename}"`
    );
    return res.send(outputBuffer);
  } else {
    const fileURL = await uploadToSupabase(outputBuffer, outputFilename, "pdf");

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

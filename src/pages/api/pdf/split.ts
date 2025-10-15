import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { promisify } from "util";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToSupabase } from "@/lib/supabase";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

const readFile = promisify(fs.readFile);

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

  if (!file || !file.mimetype?.includes("pdf")) {
    return res.status(400).json({ error: "Please upload a valid PDF file" });
  }

  const buffer = await readFile(file.filepath);
  const originalPDF = await PDFDocument.load(buffer);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const pages = originalPDF.getPages();
  const totalPages = pages.length;

  const zip = new JSZip();
  const downloadFiles: { name: string; buffer: Buffer }[] = [];

  try {
    for (let i = 0; i < totalPages; i++) {
      const newPDF = await PDFDocument.create();
      const [copiedPage] = await newPDF.copyPages(originalPDF, [i]);
      newPDF.addPage(copiedPage);
      const pdfBytes = await newPDF.save();
      const pdfBuffer = Buffer.from(pdfBytes);
      const fileName = `page-${i + 1}.pdf`;

      if (user.plan === "PRO") {
        const fileUrl = await uploadToSupabase(pdfBuffer, fileName, "pdf");

        await prisma.file.create({
          data: {
            name: fileName,
            type: "application/pdf",
            size: pdfBuffer.byteLength,
            url: fileUrl,
            userId: user.id,
            status: "PROCESSED",
          },
        });
      } else {
        zip.file(fileName, pdfBuffer);
      }

      downloadFiles.push({ name: fileName, buffer: pdfBuffer });

      if (user.plan === "FREE") {
        const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=split.zip");
        return res.send(zipBuffer);
      } else {
        return res.status(200).json({
          message: "PDF split successfully",
          files: downloadFiles.map((f) => f.name),
        });
      }
    }
  } catch (error: any) {
    console.error("PDF split failed:", error);
    return res
      .status(500)
      .json({ error: error.message || "Failed to split PDF" });
  }
}

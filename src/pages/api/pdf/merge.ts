import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { promisify } from "util";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToSupabase } from "@/lib/supabase";
import { PDFDocument } from "pdf-lib";

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

  const uploaded = data.files.files;
  if (!uploaded) {
    return res.status(400).json({ error: "No files uploaded for merging" });
  }

  const fileArray = Array.isArray(uploaded) ? uploaded : [uploaded];

  for (const file of fileArray) {
    if (!file.mimetype?.includes("pdf")) {
      return res.status(400).json({ error: "All files must be PDF" });
    }
  }

  const buffers = await Promise.all(fileArray.map((f) => readFile(f.filepath)));

  try {
    const mergedPDF = await PDFDocument.create();

    for (const buffer of buffers) {
      const pdfToMerge = await PDFDocument.load(buffer);
      const copiedPages = await mergedPDF.copyPages(
        pdfToMerge,
        pdfToMerge.getPageIndices()
      );
      for (const page of copiedPages) {
        mergedPDF.addPage(page);
      }
    }

    const mergedBytes = await mergedPDF.save();
    const mergedBuffer = Buffer.from(mergedBytes);
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.plan === "FREE") {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="merged.pdf"`);
      return res.send(mergedBuffer);
    } else {
      const filename = `merged-${Date.now()}.pdf`;
      const fileUrl = await uploadToSupabase(mergedBuffer, filename, "pdf");

      await prisma.file.create({
        data: {
          name: filename,
          type: "application/pdf",
          size: mergedBuffer.byteLength,
          url: fileUrl,
          userId: user.id,
          status: "PROCESSED",
        },
      });

      return res.status(200).json({ url: fileUrl });
    }
  } catch (error: any) {
    console.error("PDF merge failed:", error);
    return res
      .status(500)
      .json({ error: error.message || "Failed to merge PDF files" });
  }
}

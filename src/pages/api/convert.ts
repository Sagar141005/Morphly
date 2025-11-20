import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { promisify } from "util";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { convertFile } from "@/lib/convert";
import { uploadToSupabase } from "@/lib/supabase";

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

  const rawFormat = data.fields.format as string | string[] | undefined;

  const format = Array.isArray(rawFormat)
    ? rawFormat[0]?.toLowerCase()
    : rawFormat?.toLowerCase();

  if (!file || !format) {
    return res.status(400).json({ error: "Missing file or format" });
  }

  if (!file.mimetype?.startsWith("image/")) {
    return res.status(400).json({ error: "Only image files are supported" });
  }

  const buffer = await readFile(file.filepath);

  let convertedBuffer: Buffer;
  try {
    convertedBuffer = await convertFile(buffer, format);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Conversion error" });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
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
      `attachment; filename="converted.${format}"`
    );
    return res.send(convertedBuffer);
  } else {
    const fileURL = await uploadToSupabase(
      convertedBuffer,
      `converted.${format}`,
      "converted"
    );

    await prisma.file.create({
      data: {
        name: file.originalFilename ?? `converted.${format}`,
        type: file.mimetype || "image/unknown",
        size: file.size,
        url: fileURL,
        userId: user.id,
        status: "PROCESSED",
      },
    });

    return res.status(200).json({ url: fileURL });
  }
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File as FormidableFile } from "formidable";
import fs from "fs";
import { promisify } from "util";
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = promisify(fs.readFile);

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

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.plan !== "PRO") {
    return res
      .status(403)
      .json({ error: "Background removal is available for Pro users only." });
  }

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "File parsing failed." });
    }

    const uploadedFile = files.file;
    const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;

    if (!file || !file.filepath) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const fileBuffer = await readFile(file.filepath);

    //BG Remove logic

    return res.status(200).json({
      message: "File received and user is Pro. Ready for background removal.",
      filename: file.originalFilename,
      size: file.size,
      type: file.mimetype,
    });
  });
}

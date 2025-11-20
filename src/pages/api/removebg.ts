import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import axios from "axios";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { uploadToSupabase } from "@/lib/supabase";

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

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || (user.plan !== "PLUS" && user.plan !== "PRO")) {
    return res
      .status(403)
      .json({
        error: "Background removal is available for Plus and Pro users only.",
      });
  }

  if (user.aiCredits <= 0) {
    return res.status(403).json({ error: "No AI credits left" });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { aiCredits: { decrement: 1 } },
  });

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

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const cloudinaryResult = await cloudinary.uploader.upload(file.filepath, {
      folder: "bg-removed",
      transformation: [{ effect: "background_removal" }],
    });

    const imageResponse = await axios.get(cloudinaryResult.secure_url, {
      responseType: "arraybuffer",
    });

    const imageBuffer: Buffer = imageResponse.data;

    const extension = cloudinaryResult.format || "png";
    const fileName = `${Date.now()}-${file.originalFilename}.${extension}`;
    const fileURL = await uploadToSupabase(imageBuffer, fileName, "bg-removed");

    await prisma.file.create({
      data: {
        name: file.originalFilename ?? fileName,
        type: file.mimetype || "image/unknown",
        size: file.size,
        url: fileURL,
        userId: user.id,
        status: "PROCESSED",
        backgroundRemoved: true,
      },
    });

    return res.status(200).json({
      message: "Background removed successfully.",
      url: fileURL,
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return res.status(500).json({ error: "Failed to remove background." });
  }
}

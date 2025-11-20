import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import formidable from "formidable";
import cloudinary from "@/lib/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
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

  const name = Array.isArray(data.fields.name)
    ? data.fields.name[0]
    : data.fields.name;
  const profilePicFile = data.files?.profilePic;

  let profilePicUrl: string | undefined;

  if (profilePicFile) {
    const file = Array.isArray(profilePicFile)
      ? profilePicFile[0]
      : profilePicFile;
    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: "profile-pics",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      });
      profilePicUrl = result.secure_url;
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      return res
        .status(500)
        .json({ error: "Failed to upload profile picture." });
    }
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || undefined,
        profilePic: profilePicUrl || undefined,
      },
    });

    return res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update profile." });
  }
}

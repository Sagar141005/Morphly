import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, plan } = await req.json();

  const now = new Date();
  let deleteBefore: Date | undefined;

  if (plan === "PLUS")
    deleteBefore = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  if (plan === "PRO")
    deleteBefore = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  if (!deleteBefore) return NextResponse.json({ deleted: 0 });

  const deletedFiles = await prisma.file.deleteMany({
    where: {
      userId,
      createdAt: { lt: deleteBefore },
    },
  });

  return NextResponse.json({ deleted: deletedFiles.count });
}

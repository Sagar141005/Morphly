import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return new NextResponse("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const LIMIT = 50;
  const files = await prisma.file.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: LIMIT,
    ...(cursor && { skip: 1, cursor: { id: cursor } }),
  });

  const nextCursor = files.length === LIMIT ? files[files.length - 1].id : null;

  return NextResponse.json({ files, nextCursor });
}

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const file = await prisma.file.findUnique({
    where: { id },
  });

  if (!file) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.file.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

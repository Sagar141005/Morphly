import { prisma } from "@/lib/prisma";

export async function resetUserCredits(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      plan: true,
      basicCredits: true,
      aiCredits: true,
      creditsResetAt: true,
    },
  });

  if (!user) return null;

  const now = new Date();
  const lastReset = user.creditsResetAt ?? new Date(0);

  const isNewDay =
    now.getUTCFullYear() > lastReset.getUTCFullYear() ||
    now.getUTCMonth() > lastReset.getUTCMonth() ||
    now.getUTCDate() > lastReset.getUTCDate();

  const isNewMonth =
    now.getUTCFullYear() > lastReset.getUTCFullYear() ||
    now.getUTCMonth() > lastReset.getUTCMonth();

  let basicCredits = user.basicCredits;
  let aiCredits = user.aiCredits;

  if (isNewDay) {
    if (user.plan === "FREE") basicCredits = 5;
    if (user.plan === "PLUS") basicCredits = 25;
    if (user.plan === "PRO") basicCredits = 9999;
  }

  if (isNewMonth) {
    if (user.plan === "PLUS") aiCredits = 10;
    if (user.plan === "PRO") aiCredits = 100;
  }

  if (basicCredits !== user.basicCredits || aiCredits !== user.aiCredits) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        basicCredits,
        aiCredits,
        creditsResetAt: now,
      },
    });
  }

  return user;
}

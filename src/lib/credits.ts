import { prisma } from "@/lib/prisma";

export type Plan = "FREE" | "PLUS" | "PRO";

export interface UserCredits {
  basicCredits: number;
  aiCredits: number;
  plan: Plan;
  creditsResetAt?: string;
}

const DAILY_LIMITS: Record<Plan, number> = {
  FREE: 5,
  PLUS: 25,
  PRO: Number.MAX_SAFE_INTEGER,
};

const MONTHLY_AI_LIMITS: Record<Plan, number> = {
  FREE: 0,
  PLUS: 10,
  PRO: 100,
};

export function resetCreditsIfNeeded(user: UserCredits): UserCredits {
  const now = new Date();
  const lastReset = user.creditsResetAt
    ? new Date(user.creditsResetAt)
    : new Date(0);

  const isNewDay =
    now.getUTCFullYear() > lastReset.getUTCFullYear() ||
    now.getUTCMonth() > lastReset.getUTCMonth() ||
    now.getUTCDate() > lastReset.getUTCDate();

  const isNewMonth =
    now.getUTCFullYear() > lastReset.getUTCFullYear() ||
    now.getUTCMonth() > lastReset.getUTCMonth();

  let basicCredits = user.basicCredits;
  let aiCredits = user.aiCredits;

  if (isNewDay) basicCredits = DAILY_LIMITS[user.plan];
  if (isNewMonth) aiCredits = MONTHLY_AI_LIMITS[user.plan];

  return {
    ...user,
    basicCredits,
    aiCredits,
    creditsResetAt: now.toISOString(),
  };
}

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

  if (isNewDay) basicCredits = DAILY_LIMITS[user.plan];
  if (isNewMonth) aiCredits = MONTHLY_AI_LIMITS[user.plan];

  if (basicCredits !== user.basicCredits || aiCredits !== user.aiCredits) {
    return prisma.user.update({
      where: { id: userId },
      data: { basicCredits, aiCredits, creditsResetAt: now },
    });
  }

  return user;
}

export async function getUserCredits(userId?: string): Promise<UserCredits> {
  if (userId) {
    const updatedUser = await resetUserCredits(userId);
    if (!updatedUser) throw new Error("User not found");
    return {
      plan: updatedUser.plan,
      basicCredits: updatedUser.basicCredits,
      aiCredits: updatedUser.aiCredits,
      creditsResetAt: updatedUser.creditsResetAt?.toISOString(),
    };
  }

  return resetCreditsIfNeeded({ plan: "FREE", basicCredits: 5, aiCredits: 0 });
}

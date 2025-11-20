import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        basicCredits: true,
        aiCredits: true,
        plan: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      basicCredits: user.basicCredits,
      aiCredits: user.aiCredits,
      plan: user.plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

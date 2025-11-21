import { NextApiRequest, NextApiResponse } from "next";
import { resetUserCredits } from "@/lib/credits";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
    const updatedUser = await resetUserCredits(userId);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      basicCredits: updatedUser.basicCredits,
      aiCredits: updatedUser.aiCredits,
      plan: updatedUser.plan,
      creditsResetAt: updatedUser.creditsResetAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

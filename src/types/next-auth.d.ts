import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      plan: "FREE" | "PLUS" | "PRO";
      profilePic: string | null;
      basicCredits: number;
      aiCredits: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    plan?: "FREE" | "PLUS" | "PRO";
    profilePic: string | null;
    basicCredits?: number;
    aiCredits?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    plan: "FREE" | "PLUS" | "PRO";
    profilePic: string | null;
    name?: string | null;
    basicCredits: number;
    aiCredits: number;
  }
}

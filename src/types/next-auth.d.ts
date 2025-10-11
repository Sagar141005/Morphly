import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      profilePic: string | null;
      id: string;
      email: string;
      plan?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    plan?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    plan?: string;
  }
}

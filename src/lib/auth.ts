import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

function CustomPrismaAdapter(prismaInstance: typeof prisma) {
  const originalAdapter = PrismaAdapter(prismaInstance);

  return {
    ...originalAdapter,
    createUser: async (data: any) => {
      const newData = { ...data };

      if ("image" in newData) {
        newData.profilePic = newData.image;
        delete newData.image;
      }

      return originalAdapter.createUser(newData);
    },
  };
}

export const authOptions: AuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValid) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.plan = (user as any).plan || "FREE";
        token.profilePic = (user as any).profilePic || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.plan = token.plan as string;
        session.user.profilePic = token.profilePic as string | null;
      }
      return session;
    },
  },
};

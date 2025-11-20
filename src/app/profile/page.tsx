import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect("/");

  const allFiles = await prisma.file.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const recentFiles = allFiles.slice(0, 10);

  const userWithFiles = {
    ...user,
    files: recentFiles,
    allFiles,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/20 dark:from-black dark:to-neutral-900 antialiased flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-10">
        <ProfileClient user={userWithFiles} />
      </main>

      <Footer />
    </div>
  );
}

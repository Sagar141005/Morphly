import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { files: true },
  });

  if (!user || (user.plan !== "PRO" && user.plan !== "PLUS")) {
    redirect("/pricing");
  }

  const files = await prisma.file.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const totalFiles = await prisma.file.count({
    where: { userId: user.id },
  });

  const filesThisWeek = await prisma.file.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });

  const totalStorage = await prisma.file.aggregate({
    where: { userId: user.id },
    _sum: { size: true },
  });

  const growth =
    totalFiles > 0 ? Math.round((filesThisWeek / totalFiles) * 100) : 0;

  const stats = {
    totalFiles,
    filesThisWeek,
    growth,
    storageUsed: totalStorage._sum.size || 0,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50/40 to-white">
      <Navbar />
      <DashboardClient user={user} initialFiles={files} stats={stats} />
      <Footer />
    </div>
  );
}

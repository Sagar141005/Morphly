"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, ArrowRight, Layers, Sparkles, Upload } from "lucide-react";
import StorageCard from "@/components/dashboard/StorageCard";
import PlanCard from "@/components/dashboard/PlanCard";
import StatsCard from "@/components/dashboard/StatsCard";
import FilesTable from "@/components/dashboard/FilesTable";
import ConfirmModal from "@/components/ConfirmModal";
import { useUserStore } from "@/stores/userStore";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

interface FileType {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string | null;
  createdAt: string | Date;
}

export default function DashboardClient({
  initialFiles,
  stats,
}: {
  initialFiles: FileType[];
  stats: {
    totalFiles: number;
    filesThisWeek: number;
    growth: number;
    storageUsed: number;
  };
}) {
  const user = useUserStore((state) => state.user);

  const [files, setFiles] = useState<FileType[]>(initialFiles);
  const [cursor, setCursor] = useState<string | null>(
    initialFiles.length > 0 ? initialFiles[initialFiles.length - 1].id : null
  );
  const [visibleCount, setVisibleCount] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const deleteOldFiles = async () => {
      if (!user.plan || user.plan === "FREE") return;

      try {
        const res = await fetch("/api/files/delete-old", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, plan: user.plan }),
        });
        const data = await res.json();
        if (data.deleted > 0) {
          setFiles((prev) =>
            prev.filter((f) => !data.deletedFiles.includes(f.id))
          );
        }
      } catch (err) {
        console.error("Failed to delete old files:", err);
      }
    };

    deleteOldFiles();
  }, [user]);

  const loadMoreFromDB = async () => {
    if (!cursor) return;
    setLoadingMore(true);

    const res = await fetch(`/api/files?cursor=${cursor}`);
    const data = await res.json();

    setFiles((prev) => [...prev, ...data.files]);
    setCursor(data.nextCursor);

    setLoadingMore(false);
  };

  const handleShowMore = async () => {
    if (visibleCount < files.length) {
      setVisibleCount((prev) => prev + 20);
      return;
    }

    if (cursor) {
      await loadMoreFromDB();
      setVisibleCount((prev) => prev + 20);
    }
  };

  const handleDeleteClick = (id: string) => {
    setFileToDelete(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;

    try {
      await fetch(`/api/files/${fileToDelete}`, { method: "DELETE" });
      setFiles((prev) => prev.filter((f) => f.id !== fileToDelete));
      toast.success("File deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete file.");
    } finally {
      setModalOpen(false);
      setFileToDelete(null);
    }
  };

  if (!user) return <Loader />;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-3xl opacity-60" />
      </div>

      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-5xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
                  Welcome back,{" "}
                  <span className="text-transparent bg-clip-text bg-blue-600 dark:bg-blue-400">
                    {user.name || "Creator"}
                  </span>
                  <span className="ml-2 inline-block animate-wave origin-bottom-right">
                    👋
                  </span>
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-2xl">
                  Your workspace is ready. Manage your files and track your
                  usage below.
                </p>
              </div>

              <div className="hidden sm:block">
                <Link
                  href="/image/convert"
                  className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="mr-2">
                    <Plus className="w-4 h-4" />
                  </span>
                  New Conversion
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="h-full">
              <PlanCard />
            </div>
            <div className="h-full">
              <StatsCard stats={stats} />
            </div>
            <div className="h-full">
              <StorageCard
                lastUpload={files[0]?.createdAt}
                storageUsed={stats.storageUsed}
              />
            </div>
          </motion.div>

          <motion.section variants={itemVariants} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-neutral-400" />
                  Recent Files
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                  {stats.totalFiles}
                </span>
              </div>

              <Link
                href="/image/convert"
                className="sm:hidden inline-flex items-center justify-center p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
              </Link>
            </div>

            {files.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-full mb-4">
                  <Upload className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                </div>
                <p className="text-lg font-medium text-neutral-900 dark:text-white mb-1">
                  No files converted yet
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                  Your workspace is clean and ready to go.
                </p>
                <a
                  href="/image/convert"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20"
                >
                  Start new conversion
                </a>
              </div>
            ) : (
              <FilesTable
                files={files}
                visibleCount={visibleCount}
                onLoadMore={handleShowMore}
                loadingMore={loadingMore}
                onDelete={handleDeleteClick}
                showLoadMore={true}
              />
            )}
          </motion.section>
        </motion.div>
      </main>

      <ConfirmModal
        isOpen={modalOpen}
        message="Are you sure you want to delete this file? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalOpen(false)}
        action="Delete"
      />
    </div>
  );
}

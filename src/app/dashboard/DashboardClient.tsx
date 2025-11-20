"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import StorageCard from "@/components/dashboard/StorageCard";
import PlanCard from "@/components/dashboard/PlanCard";
import StatsCard from "@/components/dashboard/StatsCard";
import FilesTable from "@/components/dashboard/FilesTable";
import ConfirmModal from "@/components/ConfirmModal";

interface FileType {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string | null;
  createdAt: string | Date;
}

interface UserType {
  name: string | null;
  plan: string;
}

export default function DashboardClient({
  user,
  initialFiles,
  stats,
}: {
  user: UserType;
  initialFiles: FileType[];
  stats: {
    totalFiles: number;
    filesThisWeek: number;
    growth: number;
    storageUsed: number;
  };
}) {
  const [files, setFiles] = useState<FileType[]>(initialFiles);
  const [cursor, setCursor] = useState<string | null>(
    initialFiles.length > 0 ? initialFiles[initialFiles.length - 1].id : null
  );
  const [visibleCount, setVisibleCount] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

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
    } catch (err) {
      console.error(err);
      alert("Failed to delete file");
    } finally {
      setModalOpen(false);
      setFileToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 dark:from-black dark:to-neutral-900 antialiased">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-1">
            Welcome back,{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {user.name || "Morphly Pro"}
            </span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
            Here’s an overview of your recent activity and files.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-14"
        >
          <PlanCard plan={user.plan} />

          <StatsCard stats={stats} />

          <StorageCard
            plan={user.plan}
            lastUpload={files[0]?.createdAt}
            storageUsed={stats.storageUsed}
          />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">
              Recent Conversions
            </h2>
            <Link
              href="/convert"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition-colors"
            >
              + New Conversion
            </Link>
          </div>

          {files.length === 0 ? (
            <div className="text-center py-16 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-md">
              <p className="text-base text-neutral-600 dark:text-neutral-300 mb-2">
                No files yet — your workspace is clear!
              </p>
              <Link
                href="/"
                className="inline-block mt-2 text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm"
              >
                Start your first conversion →
              </Link>
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
      </main>
      <ConfirmModal
        isOpen={modalOpen}
        message="Are you sure you want to delete this file? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}

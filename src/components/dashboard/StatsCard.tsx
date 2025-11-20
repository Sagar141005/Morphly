"use client";

import { FileText } from "lucide-react";

export default function StatsCard({
  stats,
}: {
  stats: {
    totalFiles: number;
    filesThisWeek: number;
    growth: number;
    storageUsed: number;
  };
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <p className="text-xl sm:text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
          Total Files
        </p>
        <div className="p-2 bg-blue-50 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-lg">
          <FileText className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <p className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white">
          {stats.totalFiles}
        </p>

        {stats.totalFiles > 0 && (
          <span
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium 
        bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full"
          >
            ▲ {stats.growth}% this week
          </span>
        )}
      </div>

      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        {stats.totalFiles > 0
          ? `${stats.filesThisWeek} new this week`
          : "No uploads yet"}
      </p>
    </div>
  );
}

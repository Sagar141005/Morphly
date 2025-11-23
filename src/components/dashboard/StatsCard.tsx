import React from "react";
import { TrendingUp, FileText, Activity } from "lucide-react";

interface StatsCardProps {
  stats: {
    totalFiles: number;
    filesThisWeek: number;
    growth: number;
  };
}

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-bold text-neutral-900 dark:text-white text-lg">
            Activity
          </span>
        </div>
        {stats.growth > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20">
            <TrendingUp className="w-3 h-3" /> {stats.growth}%
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
            Files this week
          </p>
          <p className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            {stats.filesThisWeek}
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Lifetime Total
          </span>
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            {stats.totalFiles} Files
          </span>
        </div>
      </div>
    </div>
  );
}

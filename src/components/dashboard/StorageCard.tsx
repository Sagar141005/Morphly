"use client";

import React from "react";
import { motion } from "motion/react";
import { HardDrive, Clock } from "lucide-react";
import { useUserStore } from "@/stores/userStore";

export default function StorageCard({
  lastUpload,
  storageUsed,
}: {
  lastUpload: string | Date;
  storageUsed: number;
}) {
  const user = useUserStore((state) => state.user);
  const normalizedPlan = user?.plan.toLowerCase() || "free";

  const STORAGE_LIMITS: Record<string, number> = {
    free: 0,
    plus: 5000,
    pro: 50000,
  };

  const limitMB = STORAGE_LIMITS[normalizedPlan] || 0;

  const usedMB = Number((storageUsed / 1024 / 1024).toFixed(2));
  const percent = limitMB > 0 ? Math.min((usedMB / limitMB) * 100, 100) : 0;
  const lastUploadDate = lastUpload
    ? new Date(lastUpload).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <HardDrive className="w-5 h-5" />
          </div>
          <span className="font-bold text-neutral-900 dark:text-white text-lg">
            Storage
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {normalizedPlan === "free" ? (
          <div className="py-2">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800">
              Your plan doesn't include cloud storage. Files are available for
              immediate download only.
            </p>
          </div>
        ) : (
          <div className="py-1">
            <div className="flex items-end gap-1.5 mb-3">
              <span className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {usedMB}
                <span className="text-lg text-neutral-500 dark:text-neutral-500 font-semibold ml-1">
                  MB
                </span>
              </span>
              <span className="text-sm font-medium text-neutral-400 dark:text-neutral-500 mb-1.5 pb-0.5">
                / {limitMB.toLocaleString()} MB
              </span>
            </div>

            <div className="w-full h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  percent > 90
                    ? "bg-red-500"
                    : percent > 75
                    ? "bg-amber-500"
                    : "bg-blue-600"
                }`}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Last upload:</span>
          <span className="font-medium text-neutral-700 dark:text-neutral-300">
            {lastUploadDate}
          </span>
        </div>
      </div>
    </div>
  );
}

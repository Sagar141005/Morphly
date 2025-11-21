import { useUserStore } from "@/stores/userStore";
import React from "react";

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
    <div className="relative p-5 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <p className="text-xl sm:text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-1">
          Storage Used
        </p>

        {normalizedPlan === "free" ? (
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
            Your plan doesn't include cloud storage. Files are available for
            immediate download only.
          </p>
        ) : (
          <>
            <div className="relative w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden mt-2">
              <div
                className="absolute top-0 left-0 h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>

            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
              {usedMB} MB / {limitMB} MB
            </p>
          </>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Last Upload
          </p>
          <p className="text-lg font-semibold text-neutral-900 dark:text-white mt-1">
            {lastUploadDate}
          </p>
        </div>
      </div>
    </div>
  );
}

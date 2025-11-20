"use client";

import { Star, Zap, FileDown } from "lucide-react";

export default function PlanCard({ plan }: { plan: string }) {
  const normalized = plan.toLowerCase();

  const PLAN_INFO: Record<string, { label: string; icon: any; desc: string }> =
    {
      free: {
        label: "Free",
        icon: FileDown,
        desc: "You’re on the Free plan. Upgrade to unlock higher limits, faster performance, and AI tools.",
      },
      plus: {
        label: "Plus",
        icon: Zap,
        desc: "Enhanced performance, larger upload limits, AI tools, and priority queue access.",
      },
      pro: {
        label: "Pro",
        icon: Star,
        desc: "All premium features unlocked — unlimited productivity and full cloud storage.",
      },
    };

  const { label, icon: Icon, desc } = PLAN_INFO[normalized] || PLAN_INFO.free;

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-md min-h-[195px]
        ${
          normalized === "pro"
            ? "bg-gradient-to-br from-blue-600/90 via-blue-500/90 to-blue-700/90 border-blue-400 text-white shadow-md hover:shadow-lg"
            : normalized === "plus"
            ? "bg-gradient-to-br from-blue-50 via-blue-100/70 to-blue-200/50 border-blue-200 text-neutral-900 dark:bg-gradient-to-br dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 dark:border-neutral-700/80 dark:text-neutral-100 shadow-sm hover:shadow-md"
            : "bg-white/70 dark:bg-neutral-900/70 border-neutral-200 dark:border-neutral-700 dark:text-neutral-100 text-neutral-900 shadow-sm hover:shadow-md"
        }
        transition-all duration-300
      `}
    >
      {normalized === "pro" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,white,transparent_70%)] opacity-10" />
      )}
      {normalized === "plus" && (
        <div
          className="absolute inset-0 
            bg-[radial-gradient(circle_at_bottom_right,theme(colors.blue.700/30),transparent_70%)]
            dark:bg-[radial-gradient(circle_at_bottom_right,theme(colors.blue.500/10),transparent_70%)]
            pointer-events-none"
        />
      )}

      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3
              className={`text-xl sm:text-2xl font-semibold ${
                normalized === "pro"
                  ? "text-white"
                  : "text-neutral-900 dark:text-white"
              }`}
            >
              {label} Plan
            </h3>
            <div
              className={`p-2 rounded-lg ${
                normalized === "pro"
                  ? "bg-white/20 text-white"
                  : normalized === "plus"
                  ? "bg-blue-200 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  : "bg-blue-50 text-blue-600 dark:bg-neutral-800 dark:text-blue-400"
              }`}
            >
              {normalized === "pro" ? (
                <Star className="w-4 h-4" />
              ) : normalized === "plus" ? (
                <Zap className="w-4 h-4" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
            </div>
          </div>

          <p
            className={`mt-2 text-sm leading-relaxed ${
              normalized === "pro"
                ? "text-white/80"
                : normalized === "plus"
                ? "text-neutral-700 dark:text-neutral-200"
                : "text-neutral-600 dark:text-neutral-300"
            }`}
          >
            {desc}
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {normalized === "pro" ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
              <Star className="w-4 h-4 text-yellow-300" />
              Active Subscription
            </span>
          ) : (
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              onClick={() =>
                console.log(
                  `Upgrade to ${normalized === "plus" ? "Pro" : "Plus"} clicked`
                )
              }
            >
              Upgrade to {normalized === "plus" ? "Pro" : "Plus"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileDown,
  FileText,
  HardDrive,
  Clock,
  FileImage,
  File,
  Star,
  Rocket,
  Zap,
} from "lucide-react";

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
  plan?: string | null;
}

function formatFileSize(size: number) {
  return size > 1024 * 1024
    ? `${(size / (1024 * 1024)).toFixed(2)} MB`
    : `${(size / 1024).toFixed(2)} KB`;
}

function renderFileIcon(type: string) {
  switch (type) {
    case "pdf":
      return <File className="w-3 h-3" />;
    case "doc":
    case "docx":
      return <FileText className="w-3 h-3" />;
    case "jpg":
    case "jpeg":
    case "png":
      return <FileImage className="w-3 h-3" />;
    default:
      return <FileText className="w-3 h-3" />;
  }
}

export default function DashboardClient({
  user,
  files,
}: {
  user: UserType;
  files: FileType[];
}) {
  const plan = user.plan?.trim().toLowerCase() || "free";

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-48 pb-10">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">
          Welcome back,{" "}
          <span className="text-blue-600">{user.name || "Morphly Pro"}</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Here’s an overview of your recent activity and files.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14"
      >
        <div
          className={`
    relative overflow-hidden rounded-2xl border backdrop-blur-md min-h-[195px]
    ${
      plan === "pro"
        ? "bg-gradient-to-br from-blue-600/90 via-blue-500/90 to-blue-700/90 border-blue-400 text-white shadow-md hover:shadow-lg"
        : plan === "plus"
        ? "bg-gradient-to-br from-blue-50 via-blue-100/70 to-blue-200/50 border-blue-200 text-gray-900 shadow-sm hover:shadow-md"
        : "bg-white/70 border-gray-200 text-gray-900 shadow-sm hover:shadow-md"
    }
    transition-all duration-300
  `}
        >
          {/* Subtle highlight overlays */}
          {plan === "pro" && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,white,transparent_70%)] opacity-10" />
          )}
          {plan === "plus" && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#93c5fd,transparent_70%)] opacity-30" />
          )}

          <div className="relative z-10 p-6 flex flex-col h-full justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <h3
                  className={`text-2xl font-semibold ${
                    plan === "pro" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
                </h3>
                <div
                  className={`p-2 rounded-lg ${
                    plan === "pro"
                      ? "bg-white/20 text-white"
                      : plan === "plus"
                      ? "bg-blue-200 text-blue-700"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {plan === "pro" ? (
                    <Star className="w-4 h-4" />
                  ) : plan === "plus" ? (
                    <Zap className="w-4 h-4" />
                  ) : (
                    <FileDown className="w-4 h-4" />
                  )}
                </div>
              </div>

              <p
                className={`mt-2 text-sm leading-relaxed ${
                  plan === "pro"
                    ? "text-white/80"
                    : plan === "plus"
                    ? "text-gray-700"
                    : "text-gray-600"
                }`}
              >
                {plan === "pro"
                  ? "All premium features unlocked — enjoy unlimited conversions and priority access."
                  : plan === "plus"
                  ? "Enhanced performance, larger upload limits, and priority queue access — the perfect middle ground."
                  : "You’re on the Free plan. Upgrade to unlock advanced features, higher limits, and faster performance."}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
              {plan === "pro" ? (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                  <Star className="w-4 h-4 text-yellow-300" />
                  Active Subscription
                </span>
              ) : plan === "plus" ? (
                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                  onClick={() => console.log("Upgrade to Pro clicked")}
                >
                  Upgrade to Pro
                </button>
              ) : (
                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                  onClick={() => console.log("Upgrade to Plus clicked")}
                >
                  Upgrade to Plus
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          className="
    relative overflow-hidden rounded-2xl border border-gray-200
    bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg
    transition-all duration-300 flex flex-col justify-between p-5
  "
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-gray-700">Total Files</p>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileText className="w-4 h-4" />
            </div>
          </div>

          {/* Main Value */}
          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-4xl font-semibold text-gray-900">
              {files.length}
            </p>
            {files.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                ▲ 5% this week
              </span>
            )}
          </div>

          {/* Caption */}
          <p className="mt-1 text-sm text-gray-500">
            {files.length > 0
              ? "Files uploaded to your account"
              : "No uploads yet"}
          </p>
        </div>

        {/* STORAGE + LAST UPLOAD CARD */}
        <div
          className="
      relative p-5 bg-white/70 backdrop-blur-md border border-gray-200
      rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between
    "
        >
          {/* STORAGE USED */}
          <div>
            <p className="text-2xl font-semibold text-gray-700 mb-1">
              Storage Used
            </p>
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div
                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    files.length > 0
                      ? Math.min(
                          (files.reduce((acc, f) => acc + f.size, 0) /
                            (1024 * 1024 * 500)) *
                            100,
                          100
                        )
                      : 0
                  }%`,
                }}
              />
            </div>

            <p className="mt-1 text-sm text-gray-700">
              {files.length > 0
                ? `${(
                    files.reduce((acc, f) => acc + f.size, 0) /
                    1024 /
                    1024
                  ).toFixed(2)} MB / 500 MB`
                : "0 MB / 500 MB"}
            </p>
          </div>

          {/* LAST UPLOAD */}
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-xs font-medium text-gray-500">Last Upload</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {files.length > 0
                  ? new Date(files[0].createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Files Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
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
          <div className="text-center py-16 bg-white/50 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-md">
            <p className="text-base text-gray-600 mb-2">
              No files yet — your workspace is clear!
            </p>
            <Link
              href="/"
              className="inline-block mt-2 text-blue-600 font-medium hover:underline text-sm"
            >
              Start your first conversion →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white/50 backdrop-blur-xl border border-gray-200 rounded-2xl shadow hover:shadow-lg transition">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100/70 text-left uppercase text-gray-500 tracking-wide text-xs">
                <tr>
                  <th className="px-4 py-2 font-medium">File Name</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Size</th>
                  <th className="px-4 py-2 font-medium">Uploaded</th>
                  <th className="px-4 py-2 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, idx) => {
                  const cleanType = file.type.includes("/")
                    ? file.type.split("/")[1]
                    : file.type;

                  const uploaded = new Date(file.createdAt).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "short", day: "numeric" }
                  );

                  return (
                    <tr
                      key={file.id}
                      className={`border-t border-gray-200/70 transition transform hover:scale-[1.01] hover:bg-blue-50/40 cursor-pointer ${
                        idx % 2 === 0 ? "bg-white/60" : "bg-white/50"
                      }`}
                    >
                      <td className="px-4 py-2 font-medium">{file.name}</td>
                      <td className="px-4 py-2 flex items-center gap-2">
                        <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 uppercase">
                          {renderFileIcon(cleanType)} {cleanType}
                        </span>
                      </td>

                      <td className="px-4 py-2">{formatFileSize(file.size)}</td>
                      <td className="px-4 py-2">{uploaded}</td>
                      <td className="px-4 py-2 text-right">
                        {file.url ? (
                          <Link
                            href={file.url}
                            target="_blank"
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded hover:bg-blue-100 hover:text-blue-700 transition"
                          >
                            <FileDown className="w-3 h-3" /> Download
                          </Link>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>
    </main>
  );
}

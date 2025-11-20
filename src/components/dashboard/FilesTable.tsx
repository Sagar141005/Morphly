"use client";

import {
  ChevronDown,
  Download,
  File,
  FileImage,
  FileText,
  Trash,
} from "lucide-react";
import { useState } from "react";

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

interface FileType {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string | null;
  createdAt: string | Date;
}
interface FilesTableProps {
  files: FileType[];
  visibleCount: number;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  showLoadMore?: boolean;
  onDelete: (id: string) => void;
}

export default function FilesTable({
  files,
  visibleCount,
  onLoadMore,
  loadingMore = false,
  showLoadMore = true,
  onDelete,
}: FilesTableProps) {
  const visibleFiles = files.slice(0, visibleCount);

  return (
    <div className="overflow-x-auto bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow hover:shadow-lg transition">
      <table className="min-w-full text-sm text-neutral-700 dark:text-neutral-300">
        <thead className="bg-neutral-100/70 dark:bg-neutral-800/70 text-left uppercase text-neutral-500 dark:text-neutral-400 tracking-wide text-xs">
          <tr>
            <th className="px-4 py-2 font-medium">File Name</th>
            <th className="px-4 py-2 font-medium">Type</th>
            <th className="px-4 py-2 font-medium">Size</th>
            <th className="px-4 py-2 font-medium">Uploaded</th>
            <th className="px-4 py-2 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleFiles.map((file, idx) => {
            const cleanType = file.name?.includes(".")
              ? file.name.split(".").pop()!.toLowerCase()
              : file.type?.includes("/")
              ? file.type.split("/")[1].toLowerCase()
              : "file";
            const uploaded = new Date(file.createdAt).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            );

            return (
              <tr
                key={file.id}
                className={`border-t border-neutral-200/70 dark:border-neutral-700 transition transform hover:scale-[1.01] hover:bg-blue-50/40 dark:hover:bg-neutral-800/50 cursor-pointer ${
                  idx % 2 === 0
                    ? "bg-white/60 dark:bg-neutral-800/60"
                    : "bg-white/50 dark:bg-neutral-900/50"
                }`}
              >
                <td className="px-4 py-2 font-medium">{file.name}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 uppercase">
                    {renderFileIcon(cleanType)} {cleanType}
                  </span>
                </td>
                <td className="px-4 py-2">{formatFileSize(file.size)}</td>
                <td className="px-4 py-2">{uploaded}</td>
                <td className="px-4 py-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={file.url || "#"}
                      download={file.name}
                      className="p-1 rounded-md bg-neutral-100 dark:bg-neutral-700 hover:bg-green-200 dark:hover:bg-green-700 transition"
                      title="Download file"
                    >
                      <Download className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                    </a>
                    <button
                      onClick={() => onDelete(file.id)}
                      className="p-1 rounded-md bg-neutral-100 dark:bg-neutral-700 hover:bg-red-200 dark:hover:bg-red-700 transition"
                      title="Delete file"
                    >
                      <Trash className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showLoadMore && (visibleCount < files.length || onLoadMore) && (
        <div className="w-full flex justify-center py-2">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300 text-sm cursor-pointer hover:scale-[1.02]"
          >
            {loadingMore ? "Loading..." : "Show More"}
            {!loadingMore && <ChevronDown className="size-4" />}
          </button>
        </div>
      )}
    </div>
  );
}

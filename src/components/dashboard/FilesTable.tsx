import React from "react";
import {
  ChevronDown,
  Download,
  File,
  FileImage,
  FileText,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function formatFileSize(size: number) {
  return size > 1024 * 1024
    ? `${(size / (1024 * 1024)).toFixed(2)} MB`
    : `${(size / 1024).toFixed(0)} KB`;
}

function getFileIconAndColor(type: string) {
  const cleanType = type.toLowerCase();

  if (cleanType.includes("pdf")) {
    return {
      icon: FileText,
      color:
        "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 border-red-100 dark:border-red-900/30",
    };
  }
  if (
    ["jpg", "jpeg", "png", "webp", "svg"].some((x) => cleanType.includes(x))
  ) {
    return {
      icon: FileImage,
      color:
        "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30",
    };
  }
  if (["doc", "docx", "txt"].some((x) => cleanType.includes(x))) {
    return {
      icon: FileText,
      color:
        "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/30",
    };
  }
  return {
    icon: File,
    color:
      "text-neutral-600 bg-neutral-100 dark:text-neutral-400 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
  };
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
    <div className="w-full">
      <div className="overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50 dark:bg-neutral-950/50 border-b border-neutral-100 dark:border-neutral-800">
                <th className="py-4 pl-6 pr-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  File Name
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Type
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Size
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Date
                </th>
                <th className="py-4 pl-4 pr-6 text-right text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {visibleFiles.map((file) => {
                const cleanType = file.name?.includes(".")
                  ? file.name.split(".").pop()!.toLowerCase()
                  : "file";

                const { icon: FileIcon, color } =
                  getFileIconAndColor(cleanType);

                const uploaded = new Date(file.createdAt).toLocaleDateString(
                  undefined,
                  { month: "short", day: "numeric", year: "numeric" }
                );

                return (
                  <tr
                    key={file.id}
                    className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors duration-200"
                  >
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg border ${color}`}>
                          <FileIcon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm text-neutral-700 dark:text-neutral-200 truncate lg:max-w-[180px]">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-semibold uppercase">
                        {cleanType}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-neutral-500 dark:text-neutral-400 font-mono">
                      {formatFileSize(file.size)}
                    </td>
                    <td className="py-4 px-4 text-sm text-neutral-500 dark:text-neutral-400">
                      {uploaded}
                    </td>
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <a
                          href={file.url || "#"}
                          download={file.name}
                          className="p-2 rounded-lg text-neutral-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => onDelete(file.id)}
                          className="p-2 rounded-lg text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="sm:hidden flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors outline-none">
                            <MoreVertical className="w-4 h-4" />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            align="end"
                            className="w-40 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg shadow-neutral-200/20 dark:shadow-black/40"
                          >
                            <DropdownMenuItem
                              onClick={() => {
                                if (file.url) {
                                  const link = document.createElement("a");
                                  link.href = file.url;
                                  link.download = file.name;
                                  link.click();
                                }
                              }}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors focus:bg-neutral-100 dark:focus:bg-neutral-800"
                            >
                              <Download className="w-4 h-4 text-blue-500" />
                              Download
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => onDelete(file.id)}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors focus:bg-red-50 dark:focus:bg-red-900/20"
                            >
                              <Trash2 className="w-4 h-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {showLoadMore && (visibleCount < files.length || onLoadMore) && (
          <div className="border-t border-neutral-200 dark:border-neutral-800 p-2">
            <button
              onClick={onLoadMore}
              disabled={loadingMore}
              className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-colors"
            >
              {loadingMore ? (
                "Loading..."
              ) : (
                <>
                  Show More Files <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

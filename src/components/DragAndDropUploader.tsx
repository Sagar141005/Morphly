"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileIcon, FileText, FileImage, X } from "lucide-react";
import type { UploadFile } from "@/types/type";
import { usePathname, useRouter } from "next/navigation";

interface DragAndDropUploaderProps {
  showFormatSelect?: boolean;
  onSubmit: (files: UploadFile[]) => Promise<void>;
  acceptedTypes?: { [mime: string]: string[] };
  getFormatsForFile?: (type: string, name: string) => string[];
  buttonLabel?: string;
}

const getIconForFile = (type: string) => {
  if (type.startsWith("image/"))
    return <FileImage className="w-5 h-5 text-blue-600 dark:text-blue-400" />;

  if (type === "application/pdf" || type.includes("pdf"))
    return <FileText className="w-5 h-5 text-rose-600 dark:text-rose-400" />;

  if (
    type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    type.includes("word") ||
    type.includes("docx")
  )
    return (
      <FileText className="w-5 h-5 text-violet-600 dark:text-violet-400" />
    );

  if (type.startsWith("text/") || type.includes("plain"))
    return (
      <FileText className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
    );

  return (
    <FileIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
  );
};

export default function DragAndDropUploader({
  showFormatSelect = false,
  onSubmit,
  acceptedTypes = {
    "application/pdf": [],
    "image/*": [],
    "text/*": [],
  },
  getFormatsForFile = () => [],
  buttonLabel = "Submit Files",
}: DragAndDropUploaderProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return;

      const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
        file,
        format: getFormatsForFile(file.type, file.name)[0] ?? "",
      }));
      setFiles((prev) => [...prev, ...newFiles]);

      if (pathname === "/") {
        const file = acceptedFiles[0];
        const ext = file.name.split(".").pop()?.toLowerCase();

        if (ext === "pdf" || ext === "docx" || ext === "txt") {
          router.push("/file/convert");
        } else if (ext === "png" || ext === "jpg" || ext === "webp") {
          router.push("/image/convert");
        }
      }
    },
    [getFormatsForFile, router, pathname]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: acceptedTypes,
  });

  const handleFormatChange = (index: number, newFormat: string) => {
    const updated = [...files];
    updated[index].format = newFormat;
    setFiles(updated);
  };

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(files);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 p-4 sm:p-0">
      <div
        {...getRootProps()}
        className={`h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer
          ${
            isDragActive
              ? "border-blue-600 bg-blue-50/70 dark:bg-blue-900/50 text-blue-800 dark:text-blue-400 shadow-lg"
              : "border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-600 hover:border-blue-400 hover:bg-neutral-50/50 dark:hover:bg-neutral-700/50 dark:hover:border-blue-500"
          }`}
      >
        <input {...getInputProps()} />
        <img className="size-8" src="/file-upload.png" alt="" />
        <p
          className={`text-center font-medium ${
            isDragActive
              ? "text-blue-800 dark:text-blue-400"
              : "text-neutral-600 dark:text-neutral-300"
          }`}
        >
          {isDragActive
            ? "Drop files here to upload"
            : "Drag & drop files here, or click to browse"}
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-400 mt-1">
          Supported formats: PNG, JPG, PDF, DOCX, etc.
        </p>
      </div>

      {files.length > 0 && (
        <>
          <div className="space-y-3">
            {files.map((item, index) => (
              <div
                key={index}
                className="group relative flex flex-col sm:flex-row items-center justify-between bg-white/70 dark:bg-neutral-900/70 border border-neutral-100 dark:border-neutral-700 backdrop-blur-md rounded-2xl p-4 transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md hover:shadow-blue-100/40"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 dark:from-blue-500/20 transition-opacity" />

                <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-800 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-neutral-800 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      {getIconForFile(item.file.type)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm truncate max-w-xs">
                      {item.file.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {(item.file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 relative z-10 mt-3 sm:mt-0">
                  {showFormatSelect && (
                    <select
                      value={item.format}
                      onChange={(e) =>
                        handleFormatChange(index, e.target.value)
                      }
                      className="text-sm font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600 bg-white/50 dark:bg-neutral-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 transition-all cursor-pointer"
                    >
                      {getFormatsForFile(item.file.type, item.file.name).map(
                        (format) => (
                          <option key={format} value={format}>
                            {format}
                          </option>
                        )
                      )}
                    </select>
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 text-neutral-400 dark:text-neutral-300 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center pt-6">
            <button
              onClick={handleSubmit}
              disabled={loading || files.length === 0}
              className={`w-64 flex items-center justify-center gap-2 px-5 py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-sm
                ${
                  loading || files.length === 0
                    ? "bg-blue-300 dark:bg-blue-700 text-white cursor-not-allowed shadow-none"
                    : "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/30"
                }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <span>{buttonLabel}</span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

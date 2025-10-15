"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileIcon, FileText, FileImage, X } from "lucide-react";
import type { UploadFile } from "@/types/type";

interface DragAndDropUploaderProps {
  showFormatSelect?: boolean;
  onSubmit: (files: UploadFile[]) => Promise<void>;
  acceptedTypes?: { [mime: string]: string[] };
  getFormatsForFile?: (type: string, name: string) => string[];
  buttonLabel?: string;
}

const getIconForFile = (type: string) => {
  if (type.startsWith("image/")) return <FileImage className="text-blue-500" />;
  if (type.startsWith("application/pdf"))
    return <FileText className="text-red-500" />;
  return <FileIcon className="text-gray-500" />;
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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
        file,
        format: getFormatsForFile(file.type, file.name)[0] ?? "",
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    },
    [getFormatsForFile]
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
    <div className="max-w-xl mx-auto space-y-6">
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`border-2 h-64 flex items-center justify-center border-dashed rounded-md p-6 text-center transition-colors cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? "Drop files here..."
            : "Drag & drop files here, or click to browse"}
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <>
          <div className="space-y-3">
            {files.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded shadow-sm bg-white"
              >
                <div className="flex items-center gap-3">
                  {getIconForFile(item.file.type)}
                  <div>
                    <p className="font-medium text-sm">{item.file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(item.file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {showFormatSelect && (
                    <select
                      value={item.format}
                      onChange={(e) =>
                        handleFormatChange(index, e.target.value)
                      }
                      className="border px-2 py-1 rounded text-sm"
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
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : buttonLabel}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

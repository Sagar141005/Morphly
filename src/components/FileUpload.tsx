"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileIcon, FileText, FileImage, X } from "lucide-react";

const getIconForFile = (type: string) => {
  if (type.startsWith("image/")) return <FileImage className="text-blue-500" />;
  if (type.startsWith("application/pdf"))
    return <FileText className="text-red-500" />;
  return <FileIcon className="text-gray-500" />;
};

const getAvailableFormats = (type: string, name: string) => {
  const lowerName = name.toLocaleLowerCase();

  if (
    type === "application/pdf" ||
    lowerName.endsWith(".pdf" || ".docx" || ".txt")
  )
    return ["PDF", "DOCX", "TXT"];

  if (type.startsWith("image/") || /\.(png|jpg|jpeg|webp|gif)$/.test(lowerName))
    return ["JPG", "PNG", "WEBP"];

  if (type.startsWith("text/") || /\.(txt|csv|md|json)$/.test(lowerName))
    return ["PDF", "TXT"];

  return ["PDF", "TXT"];
};

interface UploadFile {
  file: File;
  format: string;
}

export default function FileUpload() {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
      file,
      format: getAvailableFormats(file.type, file.name)[0],
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "application/pdf": [],
      "image/*": [],
      "text/*": [],
    },
  });

  const handleFormatChange = (index: number, newFormat: string) => {
    const updated = [...files];
    updated[index].format = newFormat;
    setFiles(updated);
  };

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.slice(index, 1);
    setFiles(updated);
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
                <select
                  value={item.format}
                  onChange={(e) => handleFormatChange(index, e.target.value)}
                  className="border px-2 py-1 rounded text-sm"
                >
                  {getAvailableFormats(item.file.type, item.file.name).map(
                    (format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    )
                  )}
                </select>
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
      )}
    </div>
  );
}

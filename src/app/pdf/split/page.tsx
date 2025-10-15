"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";

export default function SplitPDFPage() {
  const [resultFiles, setResultFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSplit = async (files: UploadFile[]) => {
    setError(null);
    setResultFiles([]);

    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0].file);

    try {
      const res = await fetch("/api/pdf/split", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        if (res.headers.get("Content-Type")?.includes("application/zip")) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "split.zip";
          a.click();
          return;
        }

        const data = await res.json();
        throw new Error(data.error || "Failed to split PDF");
      }

      const data = await res.json();
      if (data.files) {
        setResultFiles(data.files);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Split PDF</h1>

      <DragAndDropUploader
        showFormatSelect={false}
        onSubmit={handleSplit}
        acceptedTypes={{ "application/pdf": [] }}
        buttonLabel="Split PDF"
        getFormatsForFile={() => []}
      />

      {error && <p className="text-red-500 font-medium">Error: {error}</p>}

      {resultFiles.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold mt-4">Split Pages:</h2>
          <ul className="list-disc pl-6">
            {resultFiles.map((file, idx) => (
              <li key={idx}>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {file}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

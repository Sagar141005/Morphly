"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";

export default function MergePDFPage() {
  const [resultURL, setResultURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMerge = async (files: UploadFile[]) => {
    setError(null);
    setResultURL(null);

    if (files.length > 2) {
      setError("Please upload at least two PDF files to merge.");
      return;
    }

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f.file));

    try {
      const res = await fetch("/api/pdf/merge", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        if (res.headers.get("Content-Type")?.includes("application/pdf")) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "merged.pdf";
          a.click();
          return;
        }

        const data = await res.json();
        throw new Error(data.error || "Merge failed");
      }

      const data = await res.json();
      setResultURL(data.url);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Merge PDFs</h1>

      <DragAndDropUploader
        showFormatSelect={false}
        onSubmit={handleMerge}
        acceptedTypes={{ "application/pdf": [] }}
        buttonLabel="Merge PDFs"
        getFormatsForFile={() => []}
      />

      {error && <p className="text-red-500 font-medium">Error: {error}</p>}

      {resultURL && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Merged File:</h2>
          <a
            href={resultURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
}

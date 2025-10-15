"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";

const getPDFFormats = () => ["PDF", "DOCX", "TXT"];

export default function MergePDFPage() {
  const [resultURL, setResultURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async (files: UploadFile[]) => {
    setError(null);
    setResultURL(null);

    if (files.length === 0) return;

    const file = files[0];
    const format = file.format;

    const formData = new FormData();
    formData.append("file", file.file);
    if (format) {
      formData.append("format", format);
    }

    try {
      const res = await fetch("/api/pdf/convert", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        if (
          res.headers.get("Content-Type")?.includes("application/octet-stream")
        ) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `converted.${format?.toLowerCase()}`;
          a.click();
          return;
        }

        const data = await res.json();
        throw new Error(data.error || "Conversion failed");
      }

      const data = await res.json();
      setResultURL(data.url);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Convert PDF</h1>

      <DragAndDropUploader
        showFormatSelect={true}
        onSubmit={handleConvert}
        acceptedTypes={{ "application/pdf": [] }}
        buttonLabel="Convert PDF"
        getFormatsForFile={() => getPDFFormats()}
      />

      {error && <p className="text-red-500 font-medium">Error: {error}</p>}

      {resultURL && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Converted File:</h2>
          <a
            href={resultURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Download Converted File
          </a>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";

export default function RemoveBGPage() {
  const [resultURL, setResultURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRemoveBg = async (files: UploadFile[]) => {
    if (files.length === 0) return;

    setError(null);
    setResultURL(null);

    const formData = new FormData();
    formData.append("file", files[0].file);

    try {
      const res = await fetch("/api/removebg", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to remove background");
      }

      const data = await res.json();
      setResultURL(data.url);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI Background Removal</h1>

      <DragAndDropUploader
        showFormatSelect={false}
        onSubmit={handleRemoveBg}
        acceptedTypes={{ "image/*": [] }}
        buttonLabel="Remove Background"
        getFormatsForFile={() => []}
      />

      {error && <p className="text-red-500 font-medium">Error: {error}</p>}

      {resultURL && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Result:</h2>
          <img
            src={resultURL}
            alt="Background Removed"
            className="max-w-full rounded shadow"
          />

          <a
            href={resultURL}
            download
            className="mt-2 inline-block text-blue-600 underline"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}

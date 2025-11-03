"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ConversionOverview from "@/components/ConversionOverview";
import { FileTextIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-blue-100/10 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-200/40 blur-[120px] rounded-full pointer-events-none" />

        {/* Hero Section */}
        <section className="relative pt-36 pb-20 text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto px-6"
          >
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Split Your PDF <br />
              <span className="text-blue-600">Easily & Quickly</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Upload a PDF — split it into individual pages instantly.
              <br className="hidden sm:block" />
              100% browser-based, secure, and fast.
            </p>
          </motion.div>
        </section>

        {/* Split Section */}
        <section id="split" className="relative z-10 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center items-center gap-2 text-blue-600 mb-6">
                <FileTextIcon className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wide">
                  PDF Split Tool
                </span>
              </div>

              <DragAndDropUploader
                showFormatSelect={false}
                onSubmit={handleSplit}
                acceptedTypes={{ "application/pdf": [] }}
                buttonLabel="Split PDF"
                getFormatsForFile={() => []}
              />

              {error && (
                <p className="text-red-500 font-medium mt-4 text-center">
                  {error}
                </p>
              )}

              {resultFiles.length > 0 && (
                <div className="mt-6 text-center">
                  <h2 className="font-semibold mb-2">Split Pages:</h2>
                  <ul className="list-disc pl-6 text-left inline-block">
                    {resultFiles.map((file, idx) => (
                      <li key={idx}>
                        <a
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Page {idx + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ConversionOverview />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ConversionOverview from "@/components/ConversionOverview";
import { Scissors } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function SplitPDFPage() {
  const [pageSelection, setPageSelection] = useState("all");
  const [customRange, setCustomRange] = useState("");
  const [resultFiles, setResultFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSplit = async (files: UploadFile[]) => {
    setError(null);
    setResultFiles([]);

    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0].file);
    formData.append("range", pageSelection === "all" ? "all" : customRange);

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
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-200/40 blur-[120px] rounded-full pointer-events-none" />
        <section className="relative pt-36 pb-20 text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto px-6"
          >
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Split Your File <br />
              <span className="text-blue-600">Easily & Quickly</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Upload a PDF — split it into individual pages instantly.
              <br className="hidden sm:block" />
              100% browser-based, secure, and fast.
            </p>
          </motion.div>
        </section>

        <section id="split" className="relative z-10 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center items-center gap-2 text-purple-600 mb-6">
                <Scissors className="w-5 h-5" />
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

              <div className="max-w-xl mx-auto mt-6">
                <div
                  className="
      bg-white/70 
      backdrop-blur-xl 
      border border-white/50 
      shadow-lg 
      rounded-2xl 
      p-6 
      transition-all
    "
                >
                  <h4 className="text-gray-800 font-semibold mb-3">
                    Choose pages to split:
                  </h4>

                  {/* Select */}
                  <div className="relative mb-4">
                    <select
                      className="w-full rounded-lg border border-gray-200 bg-white/60 backdrop-blur-sm px-3 py-2.5 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300/60 focus:border-blue-400 transition-all duration-200"
                      value={pageSelection}
                      onChange={(e) => setPageSelection(e.target.value)}
                    >
                      <option value="all">All pages</option>
                      <option value="single">Single Page</option>
                      <option value="range">Page Range</option>
                      <option value="custom">
                        Custom Selection (e.g., 1,3,6–8)
                      </option>
                    </select>
                  </div>

                  {/* Input */}
                  {pageSelection !== "all" && (
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={
                          pageSelection === "single"
                            ? "e.g., 4"
                            : pageSelection === "range"
                            ? "e.g., 3-7"
                            : "e.g., 1, 4, 6-9"
                        }
                        className="w-full rounded-lg border border-gray-200 bg-white/60 backdrop-blur-sm px-3 py-2.5 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300/60 focus:border-blue-400 transition-all duration-200"
                        value={customRange}
                        onChange={(e) => setCustomRange(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <p className="text-red-500 font-medium mt-4 text-center">
                  {error}
                </p>
              )}

              {resultFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-10 flex justify-center"
                >
                  <div className="relative w-full max-w-xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg rounded-2xl p-6 text-center overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-100/60 via-blue-50/40 to-indigo-100/30 rounded-2xl blur-xl opacity-80" />

                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Split Complete 🎉
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Your PDF has been successfully split into individual
                      pages. Download them below.
                    </p>

                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border border-blue-100 mb-4">
                        <Scissors className="w-8 h-8 text-blue-600" />
                      </div>

                      <span className="text-sm font-medium text-gray-700 mb-4">
                        Split Files Ready
                      </span>
                      <div className="space-y-2 w-full max-h-64 overflow-y-auto px-4">
                        {resultFiles.map((file, idx) => (
                          <a
                            key={idx}
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-sm text-blue-600 font-medium border border-gray-200 rounded-lg px-4 py-2 hover:bg-blue-50 hover:border-blue-200 transition-all"
                          >
                            Download Page {idx + 1}
                          </a>
                        ))}
                      </div>

                      <button
                        onClick={() => setResultFiles([])}
                        className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-gray-700 border border-gray-300 font-medium hover:bg-gray-50 transition-all"
                      >
                        <Scissors className="w-4 h-4 text-gray-600" />
                        Split Another File
                      </button>
                    </div>
                  </div>
                </motion.div>
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

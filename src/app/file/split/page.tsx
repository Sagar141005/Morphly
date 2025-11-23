"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";
import { motion } from "motion/react";
import Footer from "@/components/Footer";
import ConversionOverview from "@/components/ConversionOverview";
import { Scissors } from "lucide-react";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";

export default function SplitPDFPage() {
  const [pageSelection, setPageSelection] = useState("all");
  const [customRange, setCustomRange] = useState("");
  const [resultFiles, setResultFiles] = useState<string[]>([]);

  const handleSplit = async (files: UploadFile[]) => {
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
        toast.error(data.error || "Failed to split PDF");
      }

      const data = await res.json();
      if (data.files) {
        setResultFiles(data.files);
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleDownloadAll = async () => {
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      for (let i = 0; i < resultFiles.length; i++) {
        const fileUrl = resultFiles[i];
        const res = await fetch(fileUrl);
        const blob = await res.blob();
        zip.file(`page-${i + 1}.pdf`, blob);
      }

      const zipped = await zip.generateAsync({ type: "blob" });

      const url = window.URL.createObjectURL(zipped);
      const a = document.createElement("a");
      a.href = url;
      a.download = "split-pages.zip";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Failed to create ZIP");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col transition-colors selection:bg-blue-100 dark:selection:bg-blue-900">
      <Navbar />

      <main className="flex-grow relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[100px] opacity-60" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100/40 dark:bg-indigo-900/20 rounded-full blur-[120px] opacity-40" />
        </div>

        <section className="relative pt-36 pb-20 text-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
              Split Your File <br />
              <span className="text-blue-600 dark:text-blue-400">
                Easily & Quickly
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Upload a PDF — split it into individual pages instantly.
              <br className="hidden sm:block" />
              100% browser-based, secure, and fast.
            </p>
          </motion.div>
        </section>

        <section
          id="split"
          className="relative z-10 py-10 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center items-center gap-2 text-purple-600 dark:text-purple-400 mb-6">
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
                    bg-white/70 dark:bg-neutral-900/60
                    backdrop-blur-xl
                    border border-white/50 dark:border-neutral-700
                    shadow-lg rounded-2xl p-6 transition-all
                  "
                >
                  <h4 className="text-neutral-800 dark:text-neutral-100 font-semibold mb-3">
                    Choose pages to split:
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative sm:col-span-2 py-2">
                      <select
                        className="w-full appearance-none rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                        value={pageSelection}
                        onChange={(e) => setPageSelection(e.target.value)}
                      >
                        <option value="all">Split All Pages</option>
                        <option value="single">Extract Single Page</option>
                        <option value="range">Extract Page Range</option>
                        <option value="custom">
                          Custom Selection (e.g. 1,3,5)
                        </option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {pageSelection !== "all" && (
                    <input
                      type="text"
                      placeholder={
                        pageSelection === "single"
                          ? "e.g., 4"
                          : pageSelection === "range"
                          ? "e.g., 3-7"
                          : "e.g., 1, 4, 6-9"
                      }
                      className="
                        w-full rounded-lg border border-neutral-200 dark:border-neutral-700
                        bg-white/60 dark:bg-neutral-900/70
                        backdrop-blur-sm px-3 py-2.5
                        text-neutral-700 dark:text-neutral-200
                        shadow-sm focus:outline-none focus:ring-2
                        focus:ring-blue-300/60 dark:focus:ring-blue-700/40
                        transition-all
                      "
                      value={customRange}
                      onChange={(e) => setCustomRange(e.target.value)}
                    />
                  )}
                </div>
              </div>

              {resultFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-10 flex justify-center"
                >
                  <div
                    className="
                      relative w-full max-w-xl
                      bg-white/60 dark:bg-neutral-900/60
                      backdrop-blur-xl border border-white/50 dark:border-neutral-700
                      shadow-lg rounded-3xl p-6 text-center overflow-hidden
                    "
                  >
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
                      Split Complete!
                    </h3>

                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
                      Your PDF has been split into individual pages. Download
                      them below.
                    </p>

                    <div className="flex flex-col items-center justify-center">
                      <div
                        className="
                          flex items-center justify-center w-16 h-16
                          rounded-full bg-blue-50 dark:bg-blue-900/30
                          border border-blue-100 dark:border-neutral-700
                          mb-4
                        "
                      >
                        <Scissors className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>

                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-4">
                        Split Files Ready
                      </span>

                      <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
                        <button
                          onClick={handleDownloadAll}
                          className="
    flex items-center justify-center gap-2 h-10 rounded-xl px-6 py-3
    text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white
    shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto
  "
                        >
                          Download All Pages (ZIP)
                        </button>

                        <button
                          onClick={() => setResultFiles([])}
                          className="
    flex items-center justify-center gap-2 h-10 rounded-xl px-6 py-3
    text-base font-semibold bg-white dark:bg-neutral-900
    border border-neutral-200 dark:border-neutral-800
    text-neutral-700 dark:text-neutral-300
    hover:bg-neutral-50 dark:hover:bg-neutral-800
    hover:border-neutral-300 dark:hover:border-neutral-700
    transition-all duration-300 w-full sm:w-auto
  "
                        >
                          <Scissors className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                          Split Another File
                        </button>
                      </div>
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

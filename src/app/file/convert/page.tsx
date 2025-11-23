"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";
import { motion } from "motion/react";
import Footer from "@/components/Footer";
import ConversionOverview from "@/components/ConversionOverview";
import { Download, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import toast from "react-hot-toast";

const getFileFormats = () => ["PDF", "DOCX", "TXT"];

export default function MergePDFPage() {
  const [resultURL, setResultURL] = useState<string | null>(null);

  const handleConvert = async (files: UploadFile[]) => {
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
        toast.error(data.error || "Failed to convert file");
      }

      const data = await res.json();
      setResultURL(data.url);
    } catch (err: any) {
      toast.error(err.message || "Conversion failed");
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
              Convert Your PDFs <br />
              <span className="text-blue-600 dark:text-blue-400">
                Quickly & Seamlessly
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Upload your PDF — convert it instantly into your desired format.
              <br className="hidden sm:block" />
              100% browser-based, secure, and lightning-fast.
            </p>
          </motion.div>
        </section>

        <section
          id="converter"
          className="relative z-10 py-10 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center items-center gap-1 text-orange-600 dark:text-orange-400 mb-6">
                <FileText className="w-4 h-4" />
                <span className="font-semibold text-sm uppercase tracking-wide">
                  PDF Conversion Tool
                </span>
              </div>

              <DragAndDropUploader
                showFormatSelect
                onSubmit={handleConvert}
                getFormatsForFile={getFileFormats}
                buttonLabel="Convert PDF"
                acceptedTypes={{
                  "application/pdf": [],
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [],
                  "text/plain": [],
                }}
              />
              {resultURL && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  className="mt-10 flex justify-center"
                >
                  <div
                    className="
                    relative w-full max-w-xl
                    bg-white/60 dark:bg-neutral-900/60
                    backdrop-blur-xl 
                    border border-white/50 dark:border-neutral-700
                    shadow-lg rounded-3xl p-6 text-center overflow-hidden
                  "
                  >
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
                      Conversion Complete!
                    </h3>

                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
                      Your document has been processed and is ready for
                      download.
                    </p>

                    <div className="flex flex-col items-center justify-center">
                      <div
                        className="
                        flex items-center justify-center 
                        w-16 h-16 rounded-full 
                        bg-blue-50 dark:bg-blue-900/30 
                        border border-blue-100 dark:border-neutral-700 mb-4
                      "
                      >
                        <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>

                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-4">
                        Converted File Ready
                      </span>

                      <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <a
                          href={resultURL}
                          download
                          className="
                           flex items-center justify-center gap-2 h-10 rounded-xl px-6 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300
                          "
                        >
                          <Download className="w-4 h-4" />
                          Download File
                        </a>

                        <button
                          onClick={() => setResultURL(null)}
                          className="
                           flex items-center justify-center gap-2 h-10 rounded-xl px-6 py-3 text-base font-semibold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300
                          "
                        >
                          <FileText className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                          Convert Another
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

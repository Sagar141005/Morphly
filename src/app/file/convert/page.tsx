"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ConversionOverview from "@/components/ConversionOverview";
import { Download, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";

const getFileFormats = () => ["PDF", "DOCX", "TXT"];

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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-blue-100/10 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-200/40 blur-[120px] rounded-full pointer-events-none" />

        <section className="relative pt-36 pb-20 text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto px-6"
          >
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Convert Your PDFs <br />
              <span className="text-blue-600">Quickly & Seamlessly</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Upload your PDF — convert it instantly into your desired format.
              <br className="hidden sm:block" />
              100% browser-based, secure, and lightning-fast.
            </p>
          </motion.div>
        </section>

        <section id="converter" className="relative z-10 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center items-center gap-1 text-orange-600 mb-6">
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

              {error && (
                <p className="text-red-500 font-medium mt-4 text-center">
                  {error}
                </p>
              )}

              {resultURL && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-10 flex justify-center"
                >
                  <div className="relative w-full max-w-xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg rounded-2xl p-6 text-center overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-100/60 via-blue-50/40 to-indigo-100/30 rounded-2xl blur-xl opacity-80" />

                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Conversion Complete 🎉
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Your file has been successfully converted. You can
                      download it below.
                    </p>

                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border border-blue-100 mb-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 mb-4">
                        Converted File Ready
                      </span>
                      <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <a
                          href={resultURL}
                          download
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm"
                        >
                          <Download className="w-4 h-4" />
                          Download File
                        </a>

                        <button
                          onClick={() => setResultURL(null)}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-gray-700 border border-gray-300 font-medium hover:bg-gray-50 transition-all"
                        >
                          <FileText className="w-4 h-4 text-gray-600" />
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

"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ConversionOverview from "@/components/ConversionOverview";
import { FileTextIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

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

        {/* Converter Section */}
        <section id="converter" className="relative z-10 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center items-center gap-1 text-blue-600 mb-6">
                <FileTextIcon className="w-4 h-4" />
                <span className="font-semibold text-sm uppercase tracking-wide">
                  PDF Conversion Tool
                </span>
              </div>

              <DragAndDropUploader
                showFormatSelect
                onSubmit={handleConvert}
                getFormatsForFile={getPDFFormats}
                buttonLabel="Convert PDF"
                acceptedTypes={{ "application/pdf": [] }}
              />

              {error && (
                <p className="text-red-500 font-medium mt-4 text-center">
                  {error}
                </p>
              )}

              {resultURL && (
                <div className="mt-6 text-center">
                  <h2 className="font-semibold mb-2">Converted File:</h2>
                  <a
                    href={resultURL}
                    download
                    className="text-blue-600 underline"
                  >
                    Download PDF
                  </a>
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

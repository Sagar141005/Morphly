"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConversionOverview from "@/components/ConversionOverview";
import { ImageIcon } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-blue-100/10 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Background blur */}
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
              Remove Backgrounds <br />
              <span className="text-blue-600">Instantly with AI</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Upload your images and let our AI remove the background in
              seconds. 100% browser-based, secure, and easy to download.
            </p>
          </motion.div>
        </section>

        {/* Uploader Section */}
        <section id="removebg" className="relative z-10 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center items-center gap-2 text-blue-600 mb-6">
                <ImageIcon className="w-4 h-4" />
                <span className="font-semibold text-sm uppercase tracking-wide">
                  AI Background Removal Tool
                </span>
              </div>

              <DragAndDropUploader
                showFormatSelect={false}
                acceptedTypes={{ "image/*": [] }}
                onSubmit={handleRemoveBg}
                buttonLabel="Remove Background"
                getFormatsForFile={() => []}
              />

              {/* Error */}
              {error && (
                <p className="text-red-500 font-medium mt-4">Error: {error}</p>
              )}

              {/* Result */}
              {resultURL && (
                <div className="mt-6 text-center">
                  <h2 className="font-semibold mb-2">Result:</h2>
                  <img
                    src={resultURL}
                    alt="Background Removed"
                    className="max-w-full rounded shadow mx-auto"
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

              {/* Reuse the ConversionOverview Section */}
              <ConversionOverview />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

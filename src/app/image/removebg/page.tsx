"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConversionOverview from "@/components/ConversionOverview";
import { Download, Brush } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-blue-100/10 dark:from-black dark:via-neutral-900 dark:to-neutral-950 flex flex-col transition-colors">
      <Navbar />

      <main className="flex-grow relative">
        <div
          className="
            absolute -top-10 left-1/2 -translate-x-1/2 
            w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] md:w-[700px] md:h-[700px]
            bg-blue-200/40 dark:bg-blue-900/30 
            blur-[120px] rounded-full pointer-events-none
          "
        />

        <section className="relative pt-36 pb-20 text-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
              Remove Backgrounds <br />
              <span className="text-blue-600 dark:text-blue-400">
                Instantly with AI
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Upload your images and let our AI remove the background in
              seconds.
              <br className="hidden sm:block" />
              100% browser-based, secure, and easy to download.
            </p>
          </motion.div>
        </section>

        <section
          id="removebg"
          className="relative z-10 py-10 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center items-center gap-2 text-pink-600 dark:text-pink-400 mb-6">
                <Brush className="w-4 h-4" />
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

              {error && (
                <p className="text-red-500 dark:text-red-400 font-medium mt-4">
                  Error: {error}
                </p>
              )}

              {resultURL && (
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
                    backdrop-blur-xl 
                    border border-white/50 dark:border-neutral-700 
                    shadow-lg rounded-2xl p-6 text-center
                  "
                  >
                    <div
                      className="
                      absolute inset-0 -z-10 
                      bg-gradient-to-b 
                      from-blue-100/40 dark:from-blue-900/20 
                      to-pink-100/30 dark:to-pink-900/20 
                      rounded-2xl blur-xl opacity-60
                    "
                    />

                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
                      Background Removed Successfully 🎉
                    </h3>

                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
                      Your image is ready! You can preview or download it below.
                    </p>

                    <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-md">
                      <img
                        src={resultURL}
                        alt="Background Removed"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                      <a
                        href={resultURL}
                        download
                        className="
                          inline-flex items-center justify-center gap-2
                          px-5 py-2.5 rounded-lg 
                          bg-blue-600 dark:bg-blue-500 
                          text-white font-medium 
                          hover:bg-blue-700 dark:hover:bg-blue-600 
                          transition-all shadow-sm
                        "
                      >
                        <Download className="w-4 h-4" />
                        Download Image
                      </a>

                      <button
                        onClick={() => setResultURL(null)}
                        className="
                          inline-flex items-center justify-center gap-2
                          px-5 py-2.5 rounded-lg 
                          bg-white dark:bg-neutral-900 
                          text-neutral-700 dark:text-neutral-300 
                          border border-neutral-300 dark:border-neutral-700 
                          font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 
                          transition-all
                        "
                      >
                        <Brush className="w-4 h-4" />
                        Try Another
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

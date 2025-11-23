"use client";

import { useState } from "react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConversionOverview from "@/components/ConversionOverview";
import { Download, Brush } from "lucide-react";
import toast from "react-hot-toast";

export default function RemoveBGPage() {
  const [resultURL, setResultURL] = useState<string | null>(null);

  const handleRemoveBg = async (files: UploadFile[]) => {
    if (files.length === 0) return;

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
        toast.error(data.error || "Failed to remove background");
      }

      const data = await res.json();
      setResultURL(data.url);
    } catch (err: any) {
      toast.error(err.message);
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
                    shadow-lg rounded-3xl p-6 text-center
                  "
                  >
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
                      Background Removed Successfully!
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
                        flex items-center justify-center gap-2 h-10 rounded-xl px-6 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300
                       "
                      >
                        <Download className="w-4 h-4" />
                        Download Image
                      </a>

                      <button
                        onClick={() => setResultURL(null)}
                        className="
                           flex items-center justify-center gap-2 h-10 rounded-xl px-6 py-3 text-base font-semibold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300
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

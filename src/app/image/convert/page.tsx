"use client";

import ConversionOverview from "@/components/ConversionOverview";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { UploadFile } from "@/types/type";
import { motion } from "motion/react";
import { Download, FileImage, Images } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

const getImageFormats = (type: string, name: string) => {
  return ["PNG", "JPG", "WEBP"];
};

export default function ImageConversionPage() {
  const [convertedFiles, setConvertedFiles] = useState<string[]>([]);

  const handleConvert = async (files: UploadFile[]) => {
    setConvertedFiles([]);

    const output: string[] = [];

    for (const item of files) {
      const formData = new FormData();
      formData.append("file", item.file);
      if (item.format) {
        formData.append("format", item.format);
      }

      try {
        const res = await fetch("/api/convert", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData.error || "Failed to convert");
          continue;
        }

        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          output.push(data.url);
        } else {
          const blob = await res.blob();
          const localUrl = window.URL.createObjectURL(blob);
          output.push(localUrl);
        }
      } catch (err) {
        toast.error("Something went wrong.");
      }
    }

    setConvertedFiles(output);
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
              Convert Your Files <br />
              <span className="text-blue-600 dark:text-blue-400">
                Quickly & Seamlessly
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Upload any document or image — convert it instantly into your
              desired format.
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
              <div className="flex justify-center items-center gap-2 text-blue-600 dark:text-blue-400 mb-6">
                <Images className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wide">
                  File Conversion Tool
                </span>
              </div>

              <DragAndDropUploader
                showFormatSelect
                onSubmit={handleConvert}
                acceptedTypes={{ "image/*": [] }}
                buttonLabel="Convert Files"
                getFormatsForFile={getImageFormats}
              />

              {convertedFiles.length > 0 && (
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
                      Your image has been processed and is ready for download.
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
                        <FileImage className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>

                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-4">
                        Converted Image Ready
                      </span>

                      <div className="space-y-3 mb-6">
                        {convertedFiles.map((url, index) => (
                          <a
                            key={index}
                            href={url}
                            download
                            className="
              flex items-center justify-center gap-2 w-full h-10 rounded-xl 
              px-6 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 
              text-white shadow-md hover:shadow-lg transition-all duration-300
            "
                          >
                            <Download className="w-4 h-4" />
                            Download File {index + 1}
                          </a>
                        ))}
                      </div>

                      {/* BUTTONS */}
                      <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <button
                          onClick={() => setConvertedFiles([])}
                          className="
            flex items-center justify-center gap-2 h-10 rounded-xl 
            px-6 py-3 text-base font-semibold bg-white dark:bg-neutral-900 
            border border-neutral-200 dark:border-neutral-800 
            text-neutral-700 dark:text-neutral-300 
            hover:bg-neutral-50 dark:hover:bg-neutral-800 
            hover:border-neutral-300 dark:hover:border-neutral-700
            transition-all duration-300
          "
                        >
                          <Images className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                          Convert Another Image
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

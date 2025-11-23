"use client";

import ConversionOverview from "@/components/ConversionOverview";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { UploadFile } from "@/types/type";
import { motion } from "motion/react";
import { Images } from "lucide-react";
import toast from "react-hot-toast";

const getImageFormats = (type: string, name: string) => {
  return ["PNG", "JPG", "WEBP"];
};

export default function ImageConversionPage() {
  const handleConvert = async (files: UploadFile[]) => {
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
          toast.error(`Error: ${errorData.error}`);
          continue;
        }

        const contentDisposition = res.headers.get("Content-Disposition");

        if (contentDisposition?.includes("attachment")) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `converted.${(item.format ?? "txt").toLowerCase()}`;
          document.body.appendChild(link);
          link.click();
          link.remove();
        } else {
          const data = await res.json();
          window.open(data.url, "_blank");
        }
      } catch (err) {
        console.error("Conversion failed:", err);
        toast.error("Something went wrong.");
      }
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

              <ConversionOverview />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

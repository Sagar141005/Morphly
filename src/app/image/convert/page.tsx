"use client";

import ConversionOverview from "@/components/ConversionOverview";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { UploadFile } from "@/types/type";
import { motion } from "framer-motion";
import { Images } from "lucide-react";

const getAvailableFormats = (type: string, name: string) => {
  const lowerName = name.toLocaleLowerCase();

  if (
    type === "application/pdf" ||
    [".pdf", ".docx", ".txt"].some((ext) => lowerName.endsWith(ext))
  )
    return ["PDF", "DOCX", "TXT"];

  if (type.startsWith("image/") || /\.(png|jpg|jpeg|webp|gif)$/.test(lowerName))
    return ["JPG", "PNG", "WEBP"];

  if (type.startsWith("text/") || /\.(txt|csv|md|json)$/.test(lowerName))
    return ["PDF", "TXT"];

  return ["PDF", "TXT"];
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
          alert(`Error: ${errorData.error}`);
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
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-blue-100/10 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-200/40 blur-[120px] rounded-full pointer-events-none" />
        <section className="relative pt-36 pb-20 text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto px-6"
          >
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Convert Your Files <br />
              <span className="text-blue-600">Quickly & Seamlessly</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Upload any document or image — convert it instantly into your
              desired format.
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
              <div className="flex justify-center items-center gap-2 text-blue-600 mb-6">
                <Images className="w-5 h-5" />
                <span className="font-semibold text-sm uppercase tracking-wide">
                  File Conversion Tool
                </span>
              </div>

              <DragAndDropUploader
                showFormatSelect
                onSubmit={handleConvert}
                getFormatsForFile={getAvailableFormats}
                buttonLabel="Convert Files"
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

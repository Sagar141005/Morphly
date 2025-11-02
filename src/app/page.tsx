"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import Pricing from "@/components/Pricing";
import { UploadFile } from "@/types/type";
import Footer from "@/components/Footer";
import {
  Zap,
  HardDrive,
  WandSparkles,
  FileText,
  LayoutDashboard,
  Lock,
  ArrowRight,
  FileUp,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Zap,
    title: "In-Memory Speed (Free)",
    description:
      "Light files process instantly and securely, never touching a server. Ideal for quick, private jobs.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: HardDrive,
    title: "High-Volume Processing (Pro)",
    description:
      "Convert larger, complex files. Pro jobs are stored securely on Supabase for later access via the Dashboard.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: WandSparkles,
    title: "AI Background Removal (Pro)",
    description:
      "Instantly and accurately isolate subjects in any image with a single click. *Powered by Replicate.*",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: FileText,
    title: "Advanced Document Control",
    description:
      "Comprehensive PDF tools: split large documents, securely merge multiple files, and convert to/from other formats.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: LayoutDashboard,
    title: "Personal Dashboard (Pro)",
    description:
      "Track your history, manage high-volume Pro files, and download previous conversions from one central interface.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Lock,
    title: "Secure & Private Auth",
    description:
      "Log in securely with Google or GitHub (NextAuth). Your data is protected with industry-standard authentication.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 antialiased">
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-36 text-center">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight"
            >
              Files Reimagined.
              <br className="hidden md:inline" />
              <span className="text-blue-600">
                Convert Anything. Instantly.
              </span>
            </motion.h1>
            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 max-w-2xl mx-auto text-lg text-gray-600"
            >
              Upload your file, pick a format, and Morphly does the rest.
              Seamless conversion powered by modern tech — no ads, no clutter.
            </motion.p>
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="px-8 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
              >
                <Link href="#uploader" className="flex items-center gap-2">
                  <FileUp className="h-5 w-5" />
                  Start Converting
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-3 text-base font-semibold border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all"
              >
                <Link href="/pricing" className="flex items-center gap-2">
                  See Pro Features <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* 2. CORE CONVERTER DEMO */}
        <section id="uploader" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Drag, Drop, Morph.
            </h2>
            <p className="text-lg text-gray-500 mb-10">
              Try our core functionality instantly. Simply drop your file and
              choose a format.
            </p>

            <div className="w-full">
              <DragAndDropUploader
                onSubmit={function (files: UploadFile[]): Promise<void> {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
        </section>

        {/* 3. KEY FEATURES GRID */}
        <section
          id="features"
          className="py-20 bg-gradient-to-b from-white to-blue-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl mb-16">
              More Power Than Your Standard Converter
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 bg-neutral-50 transition duration-300 ease-in-out transform hover:shadow-xl rounded-xl border border-gray-100"
                >
                  <div
                    className={`p-3 inline-flex items-center justify-center ${feature.bgColor} rounded-md mb-4`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PRICING SECTION */}
        <section id="pricing" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
                Ready for Pro Power?
              </h2>
              <p className="text-xl text-gray-500 mb-12">
                Upgrade to unlock AI, unlimited storage, and high-volume
                processing.
              </p>
            </div>

            <Pricing />
          </div>
        </section>

        {/* 5. TRUST SIGNALS & FOOTER (Simple version) */}
        <Footer />
      </main>
    </div>
  );
}

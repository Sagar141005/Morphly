"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import Pricing from "@/components/Pricing";
import { UploadFile } from "@/types/type";
import Footer from "@/components/Footer";
import { ArrowRight, FileUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Testimonials from "@/components/landing/Testimonials";
import Accordion from "@/components/landing/Accordion";
import Features from "@/components/landing/Features";
import Tools from "@/components/landing/Tools";
import CTA from "@/components/landing/CTA";
import MorphingLottie from "@/components/Animation";

const faqs = [
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. Free conversions run entirely in-memory on your device. Plus and Pro users get secure, encrypted uploads handled on trusted cloud servers — your files are automatically deleted after processing.",
  },
  {
    question: "Do I need an account to use the free tools?",
    answer:
      "No signup required! You can instantly convert light files in-memory using the free tier. Sign up only if you want storage, history, or larger file support.",
  },
  {
    question: "What formats are supported?",
    answer:
      "We support popular formats like PDF, DOCX, TXT, PNG, JPG, WEBP, MP4, and more. Support for ZIP, Excel, and Audio formats is coming soon!",
  },
  {
    question: "What’s the difference between Free, Plus, and Pro?",
    answer:
      "Free offers instant, private, in-memory conversions. Plus unlocks higher file size limits and basic cloud history. Pro gives you unlimited size, batch operations, AI-powered tools, and a personal dashboard.",
  },
  {
    question: "How large can my files be?",
    answer:
      "Free tier supports up to 10MB. Plus users get 100MB, while Pro users can process files up to 2GB per job with priority servers.",
  },
  {
    question: "Can I merge or split files?",
    answer:
      "Yes! Our file merge and split tools are included in the Free plan for small documents, and in the Plus/Pro plans for larger jobs and advanced PDF controls.",
  },
  {
    question: "What happens to my files after conversion?",
    answer:
      "Free jobs are processed in-memory and instantly discarded. Plus/Pro jobs are stored temporarily (24 hours) so you can download from your dashboard.",
  },
  {
    question: "Can I cancel or change my subscription anytime?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan anytime from your account settings — no hidden fees or long-term contracts.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 7-day refund policy for new Pro subscribers who aren’t satisfied. Just reach out to support@morphly.io.",
  },
  {
    question: "Does Morphly work on mobile devices?",
    answer:
      "Yes! The entire app is optimized for both desktop and mobile browsers. You can upload and convert files from your phone seamlessly.",
  },
  {
    question: "Can I use AI background removal on Free or Plus plans?",
    answer:
      "AI-powered tools like background removal and file enhancement are exclusive to Pro users due to high compute costs.",
  },
  {
    question: "What makes Morphly different from other converters?",
    answer:
      "Morphly is built with privacy, speed, and modern UX in mind — no ads, no data mining, and lightning-fast conversions powered by cutting-edge tech.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 antialiased">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="max-w-4xl sm:max-w-5xl md:max-w-7xl mx-auto px-4 sm:px-6 py-28 sm:py-36 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight"
            >
              Files Reimagined.
              <br />
              <span className="text-blue-600 dark:text-blue-400 text-4xl lg:text-6xl">
                Convert Anything. Instantly.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 max-w-md sm:max-w-xl md:max-w-2xl mx-auto text-xl text-neutral-600 dark:text-neutral-300"
            >
              Upload your file, pick a format, and Morphly does the rest.
              Seamless conversion powered by modern tech — no ads, no clutter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center px-2 sm:px-0"
            >
              <Button
                asChild
                size="lg"
                className="px-6 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
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
                className="px-6 py-3 text-base font-semibold bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
              >
                <Link href="/pricing" className="flex items-center gap-2">
                  See Pro Features <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-16 sm:mt-20 flex justify-center"
            >
              <div className="absolute left-1/2 -translate-x-1/2 top-[70%] w-[160px] sm:w-[200px] md:w-[200px] h-[160px] sm:h-[200px] md:h-[200px] bg-blue-200/40 dark:bg-blue-500/10 blur-3xl rounded-full"></div>

              <div className="w-[200px] sm:w-[180px] lg:w-[300px]">
                <MorphingLottie />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="uploader" className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight"
            >
              Drag, Drop,{" "}
              <span className="text-blue-600 dark:text-blue-400">Morph.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-10"
            >
              Experience seamless file conversion instantly. Just drop your
              file, pick a format, and Morphly takes care of the rest — fast,
              clean, and secure.
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:px-20 gap-8">
            <motion.img
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              src="image-illustration.svg"
              alt="Illustration of file upload"
              className="w-48 lg:w-64 -rotate-12 hidden lg:block dark:opacity-80"
            />
            <div className="w-full lg:w-2/3 max-w-xl">
              <DragAndDropUploader
                onSubmit={function (files: UploadFile[]): Promise<void> {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>

            <motion.img
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              src="file-illustration.svg"
              alt="Illustration of converted files"
              className="w-48 lg:w-54 rotate-12 hidden lg:block dark:opacity-80"
            />
          </div>
        </section>

        <Tools />

        <Features />

        <section id="pricing" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-5xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
                Ready for Pro Power?
              </h2>
              <p className="text-lg text-neutral-500 dark:text-neutral-300 mb-12">
                Upgrade to unlock AI, unlimited storage, and high-volume
                processing.
              </p>
            </div>

            <Pricing />
          </div>
        </section>

        <CTA />

        <Testimonials />

        <section id="faq" className="py-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Everything you need to know about Morphly’s tools and how they
                work.
              </p>
            </div>

            <Accordion items={faqs} />

            <div className="text-center mt-12">
              <p className="text-neutral-500 dark:text-neutral-400">
                Didn’t find what you’re looking for?{" "}
                <Link
                  href="/contact"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Contact support <ArrowUpRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import DragAndDropUploader from "@/components/DragAndDropUploader";
import Lottie from "lottie-react";
import morphingAnimation from "../../public/animations/morphing-animation.json";
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
  Scissors,
  ArrowUpRight,
  Images,
  Brush,
  Blend,
  Layers,
  Globe,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

const features = [
  {
    icon: Zap,
    title: "In-Memory Speed (Free)",
    description:
      "Light files process instantly and securely, never touching a server. Ideal for quick, private jobs. Perfect for PDFs, images, and small videos with near-zero latency, all without compromising privacy.",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-900",
    colSpan: "lg:col-span-2",
  },
  {
    icon: HardDrive,
    title: "High-Volume Processing (Pro)",
    description:
      "Convert larger, complex files effortlessly. Pro jobs are stored securely on Supabase for later access via the Dashboard. Includes batch processing, priority queuing, and automatic retries for failed conversions, ensuring reliability for business-critical tasks.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900",
    rowSpan: "lg:row-span-2",
  },
  {
    icon: WandSparkles,
    title: "AI Background Removal (Pro)",
    description:
      "Instantly and accurately isolate subjects in any image with a single click. *Powered by Cloudinary.*",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-900",
  },
  {
    icon: FileText,
    title: "Advanced Document Control",
    description:
      "Comprehensive PDF tools: split large documents, securely merge multiple files, and convert to/from other formats.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900",
  },
  {
    icon: Layers,
    title: "Image Tools Suite",
    description:
      "Resize, compress, convert, and optimize images with lightning-fast processing and clean quality output.",
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-50 dark:bg-teal-900",
  },
  {
    icon: LayoutDashboard,
    title: "Personal Dashboard (Pro)",
    description:
      "Track your history, manage high-volume Pro files, and download previous conversions from one central interface. Includes analytics for usage, progress indicators, and quick-access favorite tools to streamline your workflow.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900",
    rowSpan: "lg:row-span-2",
  },
  {
    icon: Lock,
    title: "Secure & Private Auth",
    description:
      "Log in securely with Google or GitHub (NextAuth). Your data is protected with industry-standard authentication. Advanced security features include two-factor authentication, session management, and encrypted storage for sensitive files.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900",
    colSpan: "lg:col-span-2",
  },
  {
    icon: Globe,
    title: "Cloud-Based Reliability",
    description:
      "Fast global delivery powered by edge caching and distributed infrastructure for consistent performance everywhere.",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900",
  },
];

const tools = [
  {
    icon: Images,
    title: "Image Converter",
    description: "Convert your images to multiple formats instantly.",
    href: "/image/convert",
    color: "text-blue-600 dark:text-blue-400",
    highlight: "from-blue-500/10 dark:from-blue-900/80",
    bgColor: "bg-blue-50 dark:bg-blue-900",
  },
  {
    icon: Brush,
    title: "AI Background Removal",
    description: "Remove backgrounds from images with a single click.",
    href: "/ai/remove-bg",
    color: "text-pink-600 dark:text-pink-400",
    highlight: "from-pink-500/10 dark:from-pink-900/80",
    bgColor: "bg-pink-50 dark:bg-pink-900",
  },
  {
    icon: FileText,
    title: "File Converter",
    description: "Convert PDFs, DOCX, TXT and more seamlessly.",
    href: "/file/convert",
    color: "text-orange-600 dark:text-orange-400",
    highlight: "from-orange-500/10 dark:from-orange-900/80",
    bgColor: "bg-orange-50 dark:bg-orange-900",
  },
  {
    icon: Blend,
    title: "File Merge",
    description: "Combine multiple PDFs into a single file effortlessly.",
    href: "/file/merge",
    color: "text-green-600 dark:text-green-400",
    highlight: "from-green-500/10 dark:from-green-900/80",
    bgColor: "bg-green-50 dark:bg-green-900",
  },
  {
    icon: Scissors,
    title: "File Split",
    description: "Split large PDF files into smaller chunks quickly.",
    href: "/file/split",
    color: "text-purple-600 dark:text-purple-400",
    highlight: "from-purple-500/10 dark:from-purple-900/80",
    bgColor: "bg-purple-50 dark:bg-purple-900",
  },
];

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 dark:from-black dark:to-neutral-900 antialiased">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="max-w-4xl sm:max-w-5xl md:max-w-7xl mx-auto px-4 sm:px-6 py-28 sm:py-36 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-snug sm:leading-tight md:leading-tight"
            >
              Files Reimagined.
              <br />
              <span className="text-blue-600 dark:text-blue-400">
                Convert Anything. Instantly.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 max-w-md sm:max-w-xl md:max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 dark:text-neutral-300"
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
                className="px-6 py-3 text-base font-semibold bg-blue-600 hover:bg-blue-700 dark:text-white shadow-md hover:shadow-lg transition-all"
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
                className="px-6 py-3 text-base font-semibold border-neutral-300 dark:border-neutral-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
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
                <Lottie
                  animationData={morphingAnimation}
                  loop
                  autoplay
                  className="drop-shadow-lg"
                />
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
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight"
            >
              Drag, Drop,{" "}
              <span className="text-blue-600 dark:text-blue-400">Morph.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-10"
            >
              Experience seamless file conversion instantly. Just drop your
              file, pick a format, and Morphly takes care of the rest — fast,
              clean, and secure.
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:px-20 gap-8">
            <motion.img
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
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
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              src="file-illustration.svg"
              alt="Illustration of converted files"
              className="w-48 lg:w-54 rotate-12 hidden lg:block dark:opacity-80"
            />
          </div>
        </section>

        <section
          id="tools"
          className="py-24 bg-gradient-to-b from-blue-50/30 via-white to-white dark:from-neutral-900 dark:via-black dark:to-black"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
              Explore Our Tools
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-16">
              Whether it’s converting, merging, or enhancing — Morphly gives you
              the tools to handle any file with ease.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {tools.map((tool) => (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="group flex flex-col items-center p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${tool.highlight} to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <div
                    className={`p-4 mb-4 rounded-full ${tool.bgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-300 leading-relaxed">
                    {tool.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-black dark:to-neutral-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center text-neutral-900 dark:text-white sm:text-4xl mb-4">
              More Power Than Your Standard Converter
            </h2>

            <p className="text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-2xl mx-auto mb-16">
              Discover how Morphly redefines file conversion — faster, smarter,
              and more powerful than anything you’ve used before.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-3 gap-6 max-w-7xl mx-auto">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className={`bg-white/80 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-100 dark:border-neutral-800 rounded-xl shadow-sm p-6 flex flex-col gap-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden group ${
                    feature.colSpan || ""
                  } ${feature.rowSpan || ""}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 dark:from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} ${feature.color} transition-all duration-300`}
                      >
                        <feature.icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
                Ready for Pro Power?
              </h2>
              <p className="text-xl text-neutral-500 dark:text-neutral-300 mb-12">
                Upgrade to unlock AI, unlimited storage, and high-volume
                processing.
              </p>
            </div>

            <Pricing />
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-center text-white relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-4">
              Ready to level up your file workflow?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of creators and professionals using Morphly to save
              time and simplify their workflow — securely and instantly.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-all"
            >
              <a href="/signup" className="flex items-center gap-2">
                Get Started Now <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
        </section>

        <section id="faq" className="py-20 bg-blue-50/30 dark:bg-neutral-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-16">
              Everything you need to know about Morphly’s tools and how they
              work.
            </p>

            <div className="space-y-6 text-left">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const contentRef = useRef<HTMLDivElement>(null);
                const [height, setHeight] = useState(0);

                useLayoutEffect(() => {
                  if (contentRef.current) {
                    setHeight(contentRef.current.scrollHeight);
                  }
                }, [isOpen, faq.answer]);

                return (
                  <div
                    key={index}
                    className="bg-white/80 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-100 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                    >
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`h-5 w-5 text-neutral-600 dark:text-neutral-300 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <motion.div
                      animate={{
                        height: isOpen ? height : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        ref={contentRef}
                        className="px-6 pb-6 text-neutral-600 dark:text-neutral-300 text-sm"
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <p className="text-center mt-12 text-neutral-500 dark:text-neutral-300">
              Didn’t find what you’re looking for?{" "}
              <a
                href="/contact"
                className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center hover:underline"
              >
                Contact support <ArrowUpRight className="w-4 h-4 -mb-0.5" />
              </a>
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

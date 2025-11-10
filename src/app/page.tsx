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

const tools = [
  {
    icon: Images,
    title: "Image Converter",
    description: "Convert your images to multiple formats instantly.",
    href: "/image/convert",
    color: "text-blue-600",
    highlight: "from-blue-500/10",
    bgColor: "bg-blue-50",
  },
  {
    icon: Brush,
    title: "AI Background Removal",
    description: "Remove backgrounds from images with a single click.",
    href: "/ai/remove-bg",
    color: "text-pink-600",
    highlight: "from-pink-500/10",
    bgColor: "bg-pink-50",
  },
  {
    icon: FileText,
    title: "File Converter",
    description: "Convert PDFs, DOCX, TXT and more seamlessly.",
    href: "/file/convert",
    color: "text-orange-600",
    highlight: "from-orange-500/10",
    bgColor: "bg-orange-50",
  },
  {
    icon: Blend,
    title: "File Merge",
    description: "Combine multiple PDFs into a single file effortlessly.",
    href: "/file/merge",
    color: "text-green-600",
    highlight: "from-green-500/10",
    bgColor: "bg-green-50",
  },
  {
    icon: Scissors,
    title: "File Split",
    description: "Split large PDF files into smaller chunks quickly.",
    href: "/file/split",
    color: "text-purple-600",
    highlight: "from-purple-500/10",
    bgColor: "bg-purple-50",
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 antialiased">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-36 text-center">
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 max-w-2xl mx-auto text-lg text-gray-600"
            >
              Upload your file, pick a format, and Morphly does the rest.
              Seamless conversion powered by modern tech — no ads, no clutter.
            </motion.p>

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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-20 flex justify-center"
            >
              <div className="absolute left-1/2 -translate-x-1/2 top-[70%] w-[200px] h-[200px] bg-blue-200/40 blur-3xl rounded-full"></div>

              <div className="w-[160px] md:w-[210px] lg:w-[300px]">
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

        <section
          id="tools"
          className="py-24 bg-gradient-to-b from-blue-50/30 via-white to-white"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Explore Our Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
              Whether it’s converting, merging, or enhancing — Morphly gives you
              the tools to handle any file with ease.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {tools.map((tool) => (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="group flex flex-col items-center p-6 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${tool.highlight} to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <div
                    className={`p-4 mb-4 rounded-full ${tool.bgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {tool.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="py-20 bg-gradient-to-b from-white to-blue-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl mb-4">
              More Power Than Your Standard Converter
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
              Discover how Morphly redefines file conversion — faster, smarter,
              and more powerful than anything you’ve used before.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 bg-gradient-to-br from-white/20 to-white/80 backdrop-blur-sm border border-gray-100 hover:translate-y-1 transition-all duration-300 ease-in-out transform hover:shadow-xl rounded-xl"
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

        <section id="faq" className="py-20 bg-blue-50/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 mb-16">
              Everything you need to know about Morphly’s tools and how they
              work.
            </p>
            <div className="space-y-6 text-left">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-12 text-gray-500">
              Didn’t find what you’re looking for?{" "}
              <a
                href="/contact"
                className="text-blue-600 font-medium inline-flex items-center hover:underline"
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

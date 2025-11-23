"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutUs() {
  const sections = [
    {
      title: " Welcome",
      content: `Welcome to Morphly, a modern and powerful file conversion platform built for creators, developers, students, and professionals who need fast, reliable, and high-quality file tools.

We aim to make file handling effortless by offering a clean UI, fast processing, and advanced features like AI-powered background removal — all wrapped in a seamless experience.`,
    },
    {
      title: "Our Mission",
      content: `To empower users with a simple, fast, and secure way to convert and manage files online. We believe file tools shouldn’t be complicated — everything should “just work.”

Our focus is on:
• High-quality file conversions
• Lightning-fast performance
• Modern, intuitive UI
• Secure processing & privacy
• AI-enabled smart tools`,
    },
    {
      title: "What We Offer",
      content: `We provide a growing suite of smart tools, including:
• Image Conversions (PNG ⇄ JPG, PNG ⇄ WebP, JPG ⇄ WebP)
• Document Conversions (PDF ⇄ DOCX, PDF ⇄ TXT, DOCX ⇄ TXT)
• AI-Powered Background Removal
• PDF Split & Merge Tools
• File Compression
• File Storage & History Dashboard
• Stripe Payment Integration for premium features

Our vision is to become a one-stop platform for all file-related needs.`,
    },
    {
      title: "Built With Privacy & Trust",
      content: `We prioritize user privacy. Your files are processed securely and removed automatically after use unless saved in your dashboard.

We never sell or share your data.`,
    },
    {
      title: "Modern Technology",
      content: `Our platform is powered by:
• Scalable cloud infrastructure
• AI and ML-powered processing
• A secure backend with role-based systems
• Optimized UI/UX for smooth experience

We keep upgrading the platform to deliver faster speed, more formats, and high-quality output.`,
    },
    {
      title: "Our Vision",
      content: `To build a full toolkit for creators and professionals — from file conversion to editing, compression, AI enhancements, and more.

We aim to become the go-to platform for modern online utilities.`,
    },
    {
      title: "🤝 Join Our Journey",
      content: `We are continuously improving and expanding our features. Your feedback helps us build better tools.

If you have suggestions or ideas, feel free to reach out!

Thank you for choosing Morphly — where file conversion meets speed, accuracy, and simplicity.`,
    },
  ];

  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("•")) {
        return (
          <li key={i} className="flex items-start gap-2 mb-2 ml-2">
            <span className="text-blue-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
            <span>{trimmed.substring(1).trim()}</span>
          </li>
        );
      }
      if (!trimmed) return <div key={i} className="h-2" />;
      return (
        <p key={i} className="mb-2">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 antialiased transition-colors">
      <Navbar />

      <main className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6">
              About Us
            </h1>

            <p className="mt-8 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
              Learn more about Morphly, our mission, vision, and the tools we
              provide to make file conversion effortless.
            </p>
          </motion.div>

          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div className="p-8 sm:p-12 space-y-12">
              {sections.map((section, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative pl-4"
                >
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    {section.title}
                  </h2>

                  <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
                    {renderContent(section.content)}
                  </div>
                </motion.section>
              ))}
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 text-center border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Questions or feedback?{" "}
                <a
                  href="/contact"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

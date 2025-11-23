"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/30 dark:from-black dark:to-neutral-900 antialiased">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center py-48">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-600 mb-2"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-4"
        >
          Page not found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed max-w-md mx-auto"
        >
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved or deleted.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Go Back Home
          </Link>
        </motion.div>

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
      </main>

      <Footer />
    </div>
  );
}

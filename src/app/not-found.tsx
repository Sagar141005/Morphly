"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50/30 dark:from-black dark:to-neutral-900 antialiased">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center py-48">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-blue-600 dark:text-blue-400 mb-6"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-neutral-600 dark:text-neutral-300 max-w-md mx-auto mb-8"
        >
          The page you’re looking for doesn’t exist, has been removed, or is
          temporarily unavailable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Go Back Home
          </Link>
        </motion.div>

        {/* Optional subtle background decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
      </main>

      <Footer />
    </div>
  );
}

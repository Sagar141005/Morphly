"use client";

import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/");
    }
  }, [status, redirect]);

  if (status === "loading") return null;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col lg:flex-row">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 sm:px-10 py-16 relative">
        <Link
          href="/"
          className="flex items-center text-2xl mb-8 font-extrabold text-blue-600 tracking-tight"
        >
          <img src="/M.png" alt="Morphly Logo" className="h-7 w-7 mb-0.5" />
          orphly
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-2xl shadow-md p-10 border border-white/40 dark:border-neutral-700"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">
              Create Your Account
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300 text-base">
              Start transforming your files with Morphly.
            </p>
          </div>

          <SignupForm />

          <p className="mt-8 text-sm text-neutral-600 dark:text-neutral-300 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Log in
            </Link>
          </p>
        </motion.div>

        <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-12 relative z-10">
          © {new Date().getFullYear()} Morphly. All rights reserved.
        </p>
      </div>

      <div className="hidden lg:flex relative w-1/2 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-blue-500/60 to-blue-400/40 mix-blend-multiply z-10" />
        <img
          src="https://images.unsplash.com/photo-1718202248232-0cdbc15d29b2?q=80&w=1600&auto=format&fit=crop"
          alt="Abstract Morphly Visual"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-10 max-w-md">
          <h2 className="text-4xl font-extrabold mb-3">
            Join Thousands of Creators
          </h2>
          <p className="text-blue-50 text-lg leading-relaxed">
            Experience next-gen file conversion built for speed and simplicity.
          </p>
        </div>
      </div>
    </div>
  );
}

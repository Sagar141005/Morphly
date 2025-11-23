"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section
      className="
        py-24 relative overflow-hidden text-center text-white
        bg-gradient-to-br 
        from-blue-500 via-blue-600 to-blue-700
        dark:from-blue-700 dark:via-blue-800 dark:to-blue-950
        transition-colors duration-500
      "
    >
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight drop-shadow-sm">
          Ready to level up your file workflow?
        </h2>
        <p className="text-lg text-blue-100 dark:text-blue-200/90 mb-8 leading-relaxed">
          Join thousands of creators and professionals using Morphly to save
          time and simplify their workflow — securely and instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button */}
          <Button
            asChild
            size="lg"
            className="
              bg-white text-blue-700 font-bold 
              hover:bg-blue-50 hover:scale-105 
              dark:bg-white dark:text-blue-900 dark:hover:bg-blue-100
              transition-all shadow-xl shadow-blue-900/20 border border-transparent
            "
          >
            <Link href="/signup" className="flex items-center gap-2">
              Get Started Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>

          {/* Secondary Button */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="
              bg-blue-600/20 text-white border-blue-300/50 
              hover:bg-blue-500/40 hover:text-white hover:border-white 
              dark:bg-black/20 dark:border-blue-400/30 dark:hover:bg-black/40
              transition-all backdrop-blur-sm
            "
          >
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>

      {/* Background Texture */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)] pointer-events-none mix-blend-overlay"></div>
    </section>
  );
}

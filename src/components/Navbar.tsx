"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

// Simulated auth state
const userIsLoggedIn = false;

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <nav className="w-full px-4 sm:px-6 lg:px-8" aria-label="Navigation">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center text-2xl font-extrabold text-blue-600 tracking-tight hover:scale-[1.02] hover:brightness-110 transition-all"
            >
              <img src="/M.png" alt="Morphly Logo" className="h-7 w-7 mb-0.5" />
              orphly
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-4">
            {userIsLoggedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 space-y-3 pb-4 px-1">
            <Link
              href="#features"
              className="block text-base font-medium text-gray-700 hover:text-blue-600 px-2 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block text-base font-medium text-gray-700 hover:text-blue-600 px-2 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="block text-base font-medium text-gray-700 hover:text-blue-600 px-2 transition-colors"
            >
              Blog
            </Link>

            <hr className="border-gray-200 my-2" />

            {userIsLoggedIn ? (
              <Link
                href="/dashboard"
                className="block w-full text-center text-blue-700 font-semibold py-2 rounded hover:underline"
              >
                Dashboard
              </Link>
            ) : (
              <div className="space-y-2 px-2">
                <Link
                  href="/login"
                  className="block w-full text-center bg-neutral-200 text-gray-700 font-medium py-2 rounded-md hover:text-blue-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-sm transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

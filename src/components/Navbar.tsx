"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userIsLoggedIn = !!session?.user;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <nav className="w-full px-4 sm:px-6 lg:px-8" aria-label="Navigation">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center text-2xl font-extrabold text-blue-600 tracking-tight hover:scale-[1.02] hover:brightness-110 transition-all"
            >
              <img src="/M.png" alt="Morphly Logo" className="h-7 w-7 mb-0.5" />
              orphly
            </Link>

            <div className="hidden sm:flex items-center gap-6">
              <div className="relative group">
                <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-0.5">
                  Image <ChevronDown className="w-4 h-4" />
                </button>

                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50">
                  <Link
                    href="/image/convert"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Image Convert
                  </Link>
                  <Link
                    href="/image/removebg"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    AI BG Remove
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-0.5">
                  PDF <ChevronDown className="w-4 h-4" />
                </button>

                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50">
                  <Link
                    href="/file/convert"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    PDF Convert
                  </Link>
                  <Link
                    href="/file/merge"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    PDF Merge
                  </Link>
                  <Link
                    href="/file/split"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    PDF Split
                  </Link>
                </div>
              </div>

              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

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

        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 space-y-3 pb-4 px-1">
            <div className="space-y-1">
              <span className="block px-2 py-1 text-gray-700 font-medium">
                Convert
              </span>
              <Link
                href="/image/convert"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Image Convert
              </Link>
              <Link
                href="/image/removebg"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                AI BG Remove
              </Link>
            </div>

            <div className="space-y-1">
              <span className="block px-2 py-1 text-gray-700 font-medium">
                PDF
              </span>
              <Link
                href="/file/convert"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                PDF Convert
              </Link>
              <Link
                href="/file/merge"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Merge PDF
              </Link>
              <Link
                href="/file/split"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Split PDF
              </Link>
            </div>

            <Link
              href="/pricing"
              className="block text-base font-medium text-gray-700 hover:text-blue-600 px-2 transition-colors"
            >
              Pricing
            </Link>

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

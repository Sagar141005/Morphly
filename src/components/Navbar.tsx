"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import ModeToggle from "./ModeToggle";
import Image from "next/image";
import ConfirmModal from "./ConfirmModal";
import useSWR from "swr";
import { useUserStore } from "@/stores/userStore";

type CreditResponse = {
  basicCredits: number;
  aiCredits: number;
  plan: "FREE" | "PLUS" | "PRO";
};

const DAILY_LIMITS = {
  FREE: 5,
  PLUS: 25,
  PRO: Number.MAX_SAFE_INTEGER,
};

const MONTHLY_AI_LIMITS = {
  FREE: 0,
  PLUS: 10,
  PRO: 100,
};

const formatBasicCredits = (credits: number, plan: "FREE" | "PLUS" | "PRO") => {
  if (plan === "PRO") return "∞";
  return `${credits} / ${DAILY_LIMITS[plan]}`;
};

const formatAiCredits = (credits: number, plan: "FREE" | "PLUS" | "PRO") => {
  if (plan === "PRO") return `${credits} / 100`;
  return `${credits} / ${MONTHLY_AI_LIMITS[plan]}`;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Navbar: React.FC = () => {
  const { user, clearUser } = useUserStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const userIsLoggedIn = !!user;

  const { data: credits } = useSWR<CreditResponse>(
    user?.id ? `/api/credits?userId=${user.id}` : null,
    fetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  const handleLogout = () => {
    clearUser();
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
        <nav className="w-full px-4 sm:px-6 lg:px-8" aria-label="Navigation">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center text-2xl font-extrabold text-blue-600 tracking-tight hover:scale-[1.02] transition-all"
              >
                <img
                  src="/M.png"
                  alt="Morphly Logo"
                  className="h-7 w-7 mb-0.5"
                />
                orphly
              </Link>

              <div className="hidden sm:flex items-center gap-6">
                <div className="relative group">
                  <button className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-0.5">
                    Image
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50">
                    <Link
                      href="/image/convert"
                      className="block px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Image Convert
                    </Link>
                    <Link
                      href="/image/removebg"
                      className="block px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      AI BG Remove
                    </Link>
                  </div>
                </div>

                <div className="relative group">
                  <button className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-0.5">
                    File
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-150 z-50">
                    <Link
                      href="/file/convert"
                      className="block px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      File Convert
                    </Link>
                    <Link
                      href="/file/merge"
                      className="block px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      PDF Merge
                    </Link>
                    <Link
                      href="/file/split"
                      className="block px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      PDF Split
                    </Link>
                  </div>
                </div>

                <Link
                  href="/pricing"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Pricing
                </Link>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-3">
                <ModeToggle />
                {credits && (
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-yellow-300 dark:bg-yellow-600 text-neutral-600 dark:text-white shadow-sm">
                      <span aria-label="Basic">
                        Basic:{" "}
                        {formatBasicCredits(credits.basicCredits, credits.plan)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-blue-300 dark:bg-blue-600 text-neutral-600 dark:text-white shadow-sm">
                      <span aria-label="AI">
                        AI: {formatAiCredits(credits.aiCredits, credits.plan)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                {userIsLoggedIn ? (
                  <div className="relative group">
                    <button className="flex items-center">
                      {user.profilePic ? (
                        <Image
                          src={user.profilePic}
                          width={36}
                          height={36}
                          alt="Avatar"
                          className="w-9 h-9 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
                        />
                      ) : (
                        <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                      )}
                    </button>

                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md shadow-sm transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <ModeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-3 space-y-4 pb-5 px-1">
              {credits && (
                <div className="flex justify-around bg-neutral-100 dark:bg-neutral-800/40 rounded-md p-2 mb-2">
                  <div className="text-center">
                    <p className="text-xs text-yellow-600 dark:text-yellow-300">
                      Basic
                    </p>
                    <p className="font-semibold text-sm text-neutral-800 dark:text-white">
                      {formatBasicCredits(credits.basicCredits, credits.plan)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-blue-600 dark:text-blue-300">
                      AI
                    </p>
                    <p className="font-semibold text-sm text-neutral-800 dark:text-white">
                      {formatAiCredits(credits.aiCredits, credits.plan)}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <span className="block px-2 py-1 text-neutral-700 dark:text-neutral-300 font-medium">
                  Image
                </span>
                <Link
                  href="/image/convert"
                  className="block px-4 py-2 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/40 rounded-md mt-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  Image Convert
                </Link>
                <Link
                  href="/image/removebg"
                  className="block px-4 py-2 mt-1 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/40 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  AI BG Remove
                </Link>
              </div>

              <div>
                <span className="block px-2 py-1 text-neutral-700 dark:text-neutral-300 font-medium">
                  File
                </span>
                <Link
                  href="/file/convert"
                  className="block px-4 py-2 mt-1 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/40 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  File Convert
                </Link>
                <Link
                  href="/file/merge"
                  className="block px-4 py-2 mt-1 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/40 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  PDF Merge
                </Link>
                <Link
                  href="/file/split"
                  className="block px-4 py-2 mt-1 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-800/40 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  PDF Split
                </Link>
              </div>

              <Link
                href="/pricing"
                className="block text-base font-medium text-neutral-700 dark:text-neutral-300 px-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Pricing
              </Link>

              {userIsLoggedIn ? (
                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-3 px-2 py-2 bg-neutral-50 dark:bg-neutral-800/40 rounded-md">
                    {user.profilePic ? (
                      <Image
                        src={user.profilePic}
                        width={40}
                        height={40}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {user.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-neutral-800 dark:text-neutral-200 font-medium">
                        {user.name}
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="block w-full text-center text-blue-700 dark:text-blue-400 font-semibold py-2 rounded hover:underline"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    className="block w-full text-center bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium py-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="block w-full text-center text-red-600 dark:text-red-400 font-medium py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="space-y-3 px-2">
                  <Link
                    href="/login"
                    className="block w-full text-center bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium py-2 rounded-md hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-md shadow-sm transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onConfirm={() => {
          handleLogout();
          setIsLogoutModalOpen(false);
        }}
        onCancel={() => setIsLogoutModalOpen(false)}
        message="Are you sure you want to log out?"
        action="Log out"
      />
    </>
  );
};

export default Navbar;

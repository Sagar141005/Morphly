"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Zap,
  WandSparkles,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";
import { signOut } from "next-auth/react";
import ModeToggle from "./ModeToggle";
import Image from "next/image";
import ConfirmModal from "./ConfirmModal";
import useSWR from "swr";
import { useUserStore } from "@/stores/userStore";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CreditResponse = {
  basicCredits: number;
  aiCredits: number;
  plan: "FREE" | "PLUS" | "PRO";
};

const DAILY_LIMITS = {
  FREE: 5,
  PLUS: 25,
  PRO: 9999,
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

  const handleLogout = async () => {
    clearUser();
    toast.success("Logout successful");
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
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
                  <button className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-0.5 py-2">
                    Image
                    <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-y-1 z-50 overflow-hidden">
                    <Link
                      href="/image/convert"
                      className="block px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Image Convert
                    </Link>
                    <Link
                      href="/image/removebg"
                      className="block px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      AI BG Remove
                    </Link>
                  </div>
                </div>

                <div className="relative group">
                  <button className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-0.5 py-2">
                    File
                    <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-y-1 z-50 overflow-hidden">
                    <Link
                      href="/file/convert"
                      className="block px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      File Convert
                    </Link>
                    <Link
                      href="/file/merge"
                      className="block px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      PDF Merge
                    </Link>
                    <Link
                      href="/file/split"
                      className="block px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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

            <div className="hidden sm:flex items-center gap-3">
              <ModeToggle />

              {credits && (
                <div className="flex items-center">
                  <div className="flex items-center divide-x divide-neutral-200 dark:divide-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-all duration-200">
                    <TooltipProvider delayDuration={150}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="px-3.5 py-1.5 flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 tabular-nums tracking-tight">
                              {formatBasicCredits(
                                credits.basicCredits,
                                credits.plan
                              )}
                            </span>
                          </div>
                        </TooltipTrigger>

                        <TooltipContent side="bottom" className="text-xs">
                          Daily Basic Credits
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider delayDuration={150}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="px-3.5 py-1.5 flex items-center gap-2">
                            <WandSparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" />
                            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 tabular-nums tracking-tight">
                              {formatAiCredits(credits.aiCredits, credits.plan)}
                            </span>
                          </div>
                        </TooltipTrigger>

                        <TooltipContent side="bottom" className="text-xs">
                          Monthly AI Credits
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              )}

              <div className="flex items-center ml-1">
                {userIsLoggedIn ? (
                  <div className="relative group">
                    <button className="flex items-center transition-transform active:scale-95">
                      {user.profilePic ? (
                        <Image
                          src={user.profilePic}
                          width={36}
                          height={36}
                          alt="Avatar"
                          className="w-9 h-9 rounded-full object-cover border border-neutral-200 dark:border-neutral-800 ring-2 ring-transparent group-hover:ring-blue-100 dark:group-hover:ring-blue-900 transition-all"
                        />
                      ) : (
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-md border border-transparent group-hover:border-blue-200 transition-all">
                          {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                      )}
                    </button>

                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-1 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/50">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium truncate">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 truncate">
                          {user.name}
                        </p>
                      </div>
                      <div className="p-1">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4" /> Profile
                        </Link>
                      </div>
                      <div className="p-1 border-t border-neutral-100 dark:border-neutral-800">
                        <button
                          onClick={() => setIsLogoutModalOpen(true)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/login"
                      className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:hidden flex items-center gap-3">
              <ModeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="sm:hidden absolute left-0 right-0 top-16 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-64px)] animate-in slide-in-from-top-5 duration-200">
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
                {credits && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-1">
                      Your Credits
                    </p>
                    <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 p-1">
                      <div className="flex-1 flex flex-col items-center justify-center py-2 border-r border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 mb-0.5">
                          <Zap size={14} className="fill-current" />
                          <span className="text-xs font-bold">Basic</span>
                        </div>
                        <span className="text-sm font-bold text-neutral-900 dark:text-white tabular-nums">
                          {formatBasicCredits(
                            credits.basicCredits,
                            credits.plan
                          )}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center py-2">
                        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-500 mb-0.5">
                          <WandSparkles size={14} className="fill-current" />
                          <span className="text-xs font-bold">AI Tools</span>
                        </div>
                        <span className="text-sm font-bold text-neutral-900 dark:text-white tabular-nums">
                          {formatAiCredits(credits.aiCredits, credits.plan)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3 px-1">
                      Image Tools
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      <Link
                        href="/image/convert"
                        className="flex items-center px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:border-blue-500/50 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Image Convert
                      </Link>
                      <Link
                        href="/image/removebg"
                        className="flex items-center px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:border-blue-500/50 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        AI Background Remover
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3 px-1">
                      File Tools
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      <Link
                        href="/file/convert"
                        className="flex items-center px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:border-blue-500/50 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        File Convert
                      </Link>
                      <Link
                        href="/file/merge"
                        className="flex items-center px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:border-blue-500/50 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        PDF Merge
                      </Link>
                      <Link
                        href="/file/split"
                        className="flex items-center px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:border-blue-500/50 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        PDF Split
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/pricing"
                    className="flex items-center justify-between px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl text-blue-700 dark:text-blue-300 font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    View Pricing Plans{" "}
                    <ChevronDown className="-rotate-90 w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                {userIsLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {user.profilePic ? (
                        <Image
                          src={user.profilePic}
                          width={40}
                          height={40}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                          {user.name?.[0]?.toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 overflow-hidden">
                        <p className="text-neutral-900 dark:text-white font-semibold truncate">
                          {user.name}
                        </p>
                        <p className="text-neutral-500 dark:text-neutral-400 text-xs truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-200"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-200"
                      >
                        Profile
                      </Link>
                    </div>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLogoutModalOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/login"
                      className="flex items-center justify-center py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center justify-center py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
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

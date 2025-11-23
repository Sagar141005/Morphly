"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { X, Lock, KeyRound, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/user/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update password");
        setLoading(false);
        return;
      }

      toast.success("Password updated successfully!");
      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">
                    Change Password
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Secure your account
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 ml-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-12 px-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-neutral-400"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 ml-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Min. 6 characters"
                    className="w-full h-12 px-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-neutral-400"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !currentPassword || !newPassword}
                className="w-full mt-8 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

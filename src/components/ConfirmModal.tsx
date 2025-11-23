import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  action: string;
}

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  message,
  action,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                Are you sure?
              </h3>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed px-4">
                {message}
              </p>

              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  onClick={onCancel}
                  className="w-full py-2.5 rounded-xl font-medium text-sm border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={onConfirm}
                  className="w-full py-2.5 rounded-xl font-medium text-sm bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 transition-all active:scale-95 cursor-pointer"
                >
                  {action}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

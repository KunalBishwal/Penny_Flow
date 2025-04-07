"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ExpenseAddedNotification({
  onClose,
}: {
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3s

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-purple-500 text-white px-6 py-4 rounded-2xl shadow-xl backdrop-blur-lg border border-white/20"
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="w-6 h-6 text-green-300" />
        <div>
          <p className="font-semibold text-lg">Expense Added</p>
          <p className="text-sm text-white/90">Your expense has been recorded successfully.</p>
        </div>
      </div>
    </motion.div>
  );
}

// components/ui/gradient-notification.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface NotificationProps {
  type?: "success" | "error";
  title: string;
  description: string;
}

export const GradientNotification = ({ type = "success", title, description }: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl shadow-lg p-4 border text-white
        ${type === "success" ? "bg-gradient-to-r from-primary to-purple-500" : "bg-gradient-to-r from-red-500 to-pink-500"}
      `}
    >
      <div className="flex items-start gap-3">
        {type === "success" ? <CheckCircle className="mt-1" /> : <AlertTriangle className="mt-1" />}
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-white/90">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

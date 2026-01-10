"use client";

import { motion } from "framer-motion";
import { Flame, X } from "lucide-react";
import { useState } from "react";

interface StreakBannerProps {
  streak: number;
  show: boolean;
}

export function StreakBanner({ streak, show }: StreakBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!show || dismissed || streak < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-3 mt-3 glass-card bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-2xl"
        >
          🔥
        </motion.div>
        <div>
          <p className="text-white font-semibold text-sm">
            {streak} يوم متتالي! 🎉
          </p>
          <p className="text-purple-300 text-xs">
            كمّل يا بطل، خالتك فخورة فيك!
          </p>
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="p-1.5 hover:bg-purple-500/20 rounded-full transition-colors"
      >
        <X size={16} className="text-purple-400" />
      </button>
    </motion.div>
  );
}

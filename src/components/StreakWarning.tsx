"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Flame, X } from "lucide-react";

interface StreakWarningProps {
  isOpen: boolean;
  onClose: () => void;
  streak: number;
  onSaveStreak: () => void;
}

export function StreakWarning({ isOpen, onClose, streak, onSaveStreak }: StreakWarningProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-sm mx-auto"
          >
            <div className="bg-gradient-to-b from-red-900/50 to-[#1a1a2e] rounded-3xl p-6 border border-red-500/30 text-center">
              {/* Warning Icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4"
              >
                <AlertTriangle size={40} className="text-red-400" />
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                Your Streak is at Risk! 😱
              </h3>

              {/* Streak Display */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Flame size={24} className="text-orange-400" />
                <span className="text-3xl font-bold text-orange-400">{streak}</span>
                <span className="text-gray-400">day streak</span>
              </div>

              {/* Message */}
              <p className="text-gray-300 mb-6">
                Habibi, you haven't logged any spending today! 
                <span className="text-red-400"> Don't let Auntie down!</span>
                <br /><br />
                Log at least one transaction to keep your streak alive.
              </p>

              {/* Emotional Appeal */}
              <div className="bg-black/30 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-400 italic">
                  "I've been telling everyone in the family about your {streak}-day streak. 
                  Don't make me look bad, habibi! 😢"
                </p>
                <p className="text-xs text-purple-400 mt-2">— Khaltu Huda</p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSaveStreak}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold"
                >
                  Log Spending Now 🔥
                </motion.button>
                <button
                  onClick={onClose}
                  className="w-full text-gray-500 py-2 text-sm"
                >
                  Remind me later
                </button>
              </div>

              {/* Loss Aversion */}
              <p className="text-xs text-red-400/70 mt-4">
                ⚠️ You'll lose all {streak} days of progress if you don't log today!
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

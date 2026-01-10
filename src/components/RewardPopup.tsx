"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Gift, Trophy } from "lucide-react";
import { useEffect } from "react";

interface RewardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: "streak" | "achievement" | "saving" | "challenge";
  title: string;
  description: string;
  points?: number;
}

const CONFETTI_COLORS = ["#7c3aed", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

export function RewardPopup({ isOpen, onClose, type, title, description, points }: RewardPopupProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const icons = {
    streak: <Sparkles size={32} className="text-orange-400" />,
    achievement: <Trophy size={32} className="text-yellow-400" />,
    saving: <Gift size={32} className="text-green-400" />,
    challenge: <Star size={32} className="text-purple-400" />,
  };

  const gradients = {
    streak: "from-orange-600 to-red-600",
    achievement: "from-yellow-600 to-orange-600",
    saving: "from-green-600 to-emerald-600",
    challenge: "from-purple-600 to-pink-600",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-20 inset-x-4 z-50 max-w-sm mx-auto"
        >
          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -20, 
                  x: Math.random() * 300 - 150,
                  rotate: 0,
                  opacity: 1 
                }}
                animate={{ 
                  y: 200, 
                  rotate: Math.random() * 360,
                  opacity: 0 
                }}
                transition={{ 
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                  left: "50%"
                }}
              />
            ))}
          </div>

          {/* Card */}
          <motion.div
            initial={{ rotateX: -30 }}
            animate={{ rotateX: 0 }}
            className={`bg-gradient-to-br ${gradients[type]} rounded-2xl p-1 shadow-2xl`}
          >
            <div className="bg-[#1a1a2e] rounded-xl p-5">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0"
                >
                  {icons[type]}
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">{title}</h4>
                  <p className="text-sm text-gray-300">{description}</p>
                  {points && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 font-semibold">+{points} points</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

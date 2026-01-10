"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface DailyChallengeProps {
  onAccept: () => void;
  completed: boolean;
}

const CHALLENGES = [
  { id: 1, title: "يوم بدون قهوة", description: "تجنب القهوة من برا اليوم", reward: 50, emoji: "☕️" },
  { id: 2, title: "غدا من البيت", description: "جهز غداك بنفسك", reward: 75, emoji: "🍱" },
  { id: 3, title: "امشي بدال الأوبر", description: "امشي للمسافات القريبة", reward: 60, emoji: "🚶" },
  { id: 4, title: "بدون تسوق أونلاين", description: "سكر تطبيقات التسوق!", reward: 100, emoji: "🛒" },
  { id: 5, title: "ترفيه مجاني", description: "لا ترفيه مدفوع اليوم", reward: 80, emoji: "🎬" },
  { id: 6, title: "طبخ لبكرة", description: "اطبخ ليومين", reward: 90, emoji: "👨‍🍳" },
  { id: 7, title: "يوم صفر صرف", description: "لا تصرف ولا ريال", reward: 150, emoji: "💰" },
];

export function DailyChallenge({ onAccept, completed }: DailyChallengeProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const [challenge, setChallenge] = useState(CHALLENGES[0]);

  useEffect(() => {
    const today = new Date().toDateString();
    const seed = today.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    const todayChallenge = CHALLENGES[seed % CHALLENGES.length];
    setChallenge(todayChallenge);

    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}س ${minutes}د`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#1e1529] rounded-xl p-4 border ${
        completed 
          ? "border-green-500/30 bg-green-500/5" 
          : "border-purple-500/20"
      }`}
      role="region"
      aria-label="تحدي اليوم"
    >
      {/* Header with timer */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-purple-400">🎯 تحدي اليوم</span>
        {!completed && (
          <div className="flex items-center gap-1 text-xs text-[#8b7a9e]">
            <Clock size={12} />
            <span>ينتهي خلال {timeLeft}</span>
          </div>
        )}
      </div>

      {/* Challenge content */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl flex-shrink-0">
          {challenge.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm">{challenge.title}</h3>
          <p className="text-xs text-[#8b7a9e] mt-0.5">{challenge.description}</p>
        </div>
      </div>

      {/* Action row */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-purple-500/10">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#8b7a9e]">المكافأة:</span>
          <span className="text-sm font-bold text-green-400">+{challenge.reward} ر.س توفير</span>
        </div>
        {completed ? (
          <div className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
            <span>✓</span>
            <span>مكتمل</span>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-4 py-2 rounded-lg font-medium"
            aria-label={`قبول التحدي: ${challenge.title}`}
          >
            قبول التحدي
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

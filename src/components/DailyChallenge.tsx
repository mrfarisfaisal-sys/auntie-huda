"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const CHALLENGES = {
  en: [
    { id: 1, title: "No coffee day", description: "Skip the coffee shop today", reward: 50, emoji: "☕️" },
    { id: 2, title: "Homemade lunch", description: "Prepare your own lunch", reward: 75, emoji: "🍱" },
    { id: 3, title: "Walk instead of Uber", description: "Walk for short distances", reward: 60, emoji: "🚶" },
    { id: 4, title: "No online shopping", description: "Close those shopping apps!", reward: 100, emoji: "🛒" },
    { id: 5, title: "Free entertainment", description: "No paid entertainment today", reward: 80, emoji: "🎬" },
    { id: 6, title: "Meal prep", description: "Cook for two days", reward: 90, emoji: "👨‍🍳" },
    { id: 7, title: "Zero spending day", description: "Don't spend a single penny", reward: 150, emoji: "💰" },
  ],
  ar: [
    { id: 1, title: "يوم بدون قهوة", description: "تجنب القهوة من برا اليوم", reward: 50, emoji: "☕️" },
    { id: 2, title: "غدا من البيت", description: "جهز غداك بنفسك", reward: 75, emoji: "🍱" },
    { id: 3, title: "امشي بدال الأوبر", description: "امشي للمسافات القريبة", reward: 60, emoji: "🚶" },
    { id: 4, title: "بدون تسوق أونلاين", description: "سكر تطبيقات التسوق!", reward: 100, emoji: "🛒" },
    { id: 5, title: "ترفيه مجاني", description: "لا ترفيه مدفوع اليوم", reward: 80, emoji: "🎬" },
    { id: 6, title: "طبخ لبكرة", description: "اطبخ ليومين", reward: 90, emoji: "👨‍🍳" },
    { id: 7, title: "يوم صفر صرف", description: "لا تصرف ولا ريال", reward: 150, emoji: "💰" },
  ],
  fr: [
    { id: 1, title: "Journée sans café", description: "Évitez le café extérieur", reward: 50, emoji: "☕️" },
    { id: 2, title: "Déjeuner maison", description: "Préparez votre déjeuner", reward: 75, emoji: "🍱" },
    { id: 3, title: "Marchez au lieu d'Uber", description: "Marchez pour les courtes distances", reward: 60, emoji: "🚶" },
    { id: 4, title: "Pas de shopping en ligne", description: "Fermez ces applis!", reward: 100, emoji: "🛒" },
    { id: 5, title: "Divertissement gratuit", description: "Pas de divertissement payant", reward: 80, emoji: "🎬" },
    { id: 6, title: "Préparez pour demain", description: "Cuisinez pour deux jours", reward: 90, emoji: "👨‍🍳" },
    { id: 7, title: "Journée zéro dépense", description: "Ne dépensez pas un centime", reward: 150, emoji: "💰" },
  ],
};

const TEXTS = {
  en: {
    todaysChallenge: "🎯 Today's Challenge",
    endsIn: "Ends in",
    h: "h",
    m: "m",
    reward: "Reward:",
    savings: "savings",
    completed: "Completed",
    acceptChallenge: "Accept Challenge",
  },
  ar: {
    todaysChallenge: "🎯 تحدي اليوم",
    endsIn: "ينتهي خلال",
    h: "س",
    m: "د",
    reward: "المكافأة:",
    savings: "ر.س توفير",
    completed: "مكتمل",
    acceptChallenge: "قبول التحدي",
  },
  fr: {
    todaysChallenge: "🎯 Défi du Jour",
    endsIn: "Termine dans",
    h: "h",
    m: "m",
    reward: "Récompense:",
    savings: "économies",
    completed: "Terminé",
    acceptChallenge: "Accepter le défi",
  },
};

interface DailyChallengeProps {
  onAccept: () => void;
  completed: boolean;
}

export function DailyChallenge({ onAccept, completed }: DailyChallengeProps) {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;
  const challenges = CHALLENGES[language] || CHALLENGES.en;
  const [timeLeft, setTimeLeft] = useState("");
  const [challenge, setChallenge] = useState(challenges[0]);

  useEffect(() => {
    const today = new Date().toDateString();
    const seed = today.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    const todayChallenge = challenges[seed % challenges.length];
    setChallenge(todayChallenge);

    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}${t.h} ${minutes}${t.m}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [challenges, t.h, t.m]);

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
        <span className="text-xs font-medium text-purple-400">{t.todaysChallenge}</span>
        {!completed && (
          <div className="flex items-center gap-1 text-xs text-[#8b7a9e]">
            <Clock size={12} />
            <span>{t.endsIn} {timeLeft}</span>
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
          <span className="text-xs text-[#8b7a9e]">{t.reward}</span>
          <span className="text-sm font-bold text-green-400">+{challenge.reward} {t.savings}</span>
        </div>
        {completed ? (
          <div className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
            <span>✓</span>
            <span>{t.completed}</span>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-4 py-2 rounded-lg font-medium"
            aria-label={`${t.acceptChallenge}: ${challenge.title}`}
          >
            {t.acceptChallenge}
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

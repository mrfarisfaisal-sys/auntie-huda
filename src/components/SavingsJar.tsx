"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const TEXTS = {
  en: {
    savingsGoal: "Savings Goal",
    done: "Done! 🎉",
    of: "of",
    todaySavings: "Today's savings",
    addedEndOfDay: "Added to your balance at end of day ✨",
    complete: "🎉 MashaAllah! Auntie is proud of you!",
    halfway: "💪 More than half! Keep going champ!",
    start: "🌱 Every penny counts. You can do it!",
  },
  ar: {
    savingsGoal: "هدف التوفير",
    done: "تم! 🎉",
    of: "من",
    todaySavings: "توفير اليوم",
    addedEndOfDay: "يُضاف لرصيدك نهاية اليوم ✨",
    complete: "🎉 ماشاء الله! خالتك فخورة فيك!",
    halfway: "💪 أكثر من النص! كمّل يا بطل!",
    start: "🌱 كل ريال يفرق. أنت تقدر!",
  },
  fr: {
    savingsGoal: "Objectif d'épargne",
    done: "Terminé! 🎉",
    of: "sur",
    todaySavings: "Économies du jour",
    addedEndOfDay: "Ajouté à votre solde en fin de journée ✨",
    complete: "🎉 MashaAllah! Tante est fière de vous!",
    halfway: "💪 Plus de la moitié! Continuez!",
    start: "🌱 Chaque centime compte. Vous pouvez le faire!",
  },
};

interface SavingsJarProps {
  saved: number;
  goal: number;
  currency: string;
  todayPotential?: number; // Today's potential savings (budget - spending)
}

export function SavingsJar({ saved = 0, goal = 5000, currency = "SAR", todayPotential = 0 }: SavingsJarProps) {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;
  const safeSaved = saved || 0;
  const safeGoal = goal || 5000;
  const percentage = Math.min((safeSaved / safeGoal) * 100, 100);
  const isComplete = safeSaved >= safeGoal;
  const showPotential = todayPotential > 0;

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-5 border border-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-purple-400" />
          <span className="font-semibold text-white">{t.savingsGoal}</span>
        </div>
        {isComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs"
          >
            <Sparkles size={12} />
            {t.done}
          </motion.div>
        )}
      </div>

      {/* Jar Visualization */}
      <div className="relative h-40 w-24 mx-auto mb-4">
        {/* Jar Outline */}
        <div className="absolute inset-0 border-4 border-white/20 rounded-b-3xl rounded-t-lg overflow-hidden">
          {/* Water Fill */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-purple-400"
            style={{ originY: 1 }}
          >
            {/* Bubbles Animation */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  initial={{ y: 100, x: Math.random() * 60 + 10 }}
                  animate={{ 
                    y: -20,
                    transition: {
                      repeat: Infinity,
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 2,
                    }
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Jar Lid */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-lg" />
        
        {/* Percentage Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white drop-shadow-lg">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="text-center space-y-1">
        <p className="text-2xl font-bold text-white">
          {safeSaved.toLocaleString()} <span className="text-sm text-[#8b7a9e]">{currency}</span>
        </p>
        <p className="text-xs text-[#8b7a9e]">
          {t.of} {safeGoal.toLocaleString()} {currency}
        </p>
      </div>

      {/* Today's Potential Savings */}
      {showPotential && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 bg-green-500/10 border border-green-500/20 rounded-xl p-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-green-400" />
              <span className="text-xs text-green-400">{t.todaySavings}</span>
            </div>
            <span className="text-sm font-bold text-green-400">
              +{todayPotential} {currency}
            </span>
          </div>
          <p className="text-[10px] text-green-400/70 mt-1">
            {t.addedEndOfDay}
          </p>
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${
            isComplete 
              ? "bg-gradient-to-r from-green-400 to-emerald-400" 
              : "bg-gradient-to-r from-purple-500 to-pink-500"
          }`}
        />
      </div>

      {/* Motivational Text */}
      <p className="text-center text-xs text-[#8b7a9e] mt-3">
        {isComplete 
          ? t.complete 
          : percentage > 50 
            ? t.halfway
            : t.start}
      </p>
    </div>
  );
}

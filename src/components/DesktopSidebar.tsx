"use client";

import { Flame, Target, TrendingUp, Trophy, Calendar, Sparkles } from "lucide-react";
import { SavingsJar } from "./SavingsJar";
import { useLanguage } from "@/lib/i18n";

const TEXTS = {
  en: {
    welcome: "Welcome",
    habibi: "friend",
    streakDays: "day streak",
    transactions: "transactions",
    yourGoal: "Your Goal",
    thisWeek: "This Week",
    transactionsLabel: "Transactions",
    saved: "Saved",
    streak: "Streak",
    days: "days",
    auntiesTip: "Auntie's Tip",
    madeWith: "Made with 💜 by Auntie Huda",
    tips: [
      "Make coffee at home, save money! ☕️",
      "Cousin Ahmed doesn't order delivery! 🍕",
      "Every penny saved brings you closer! 💰",
      "Your future self will thank you! 🙏",
      "Auntie believes in you habibi! 💜",
    ],
  },
  ar: {
    welcome: "أهلاً بك",
    habibi: "حبيبي",
    streakDays: "أيام متتالية",
    transactions: "معاملة",
    yourGoal: "هدفك",
    thisWeek: "هذا الأسبوع",
    transactionsLabel: "المعاملات",
    saved: "وفرت",
    streak: "الستريك",
    days: "يوم",
    auntiesTip: "نصيحة خالتك",
    madeWith: "صنع بـ 💜 من خالتك هدى",
    tips: [
      "خلي القهوة بالبيت وفر فلوسك! ☕️",
      "ابن عمك أحمد ما يطلب توصيل! 🍕",
      "كل ريال توفره يقربك لحلمك! 💰",
      "نفسك المستقبلية بتشكرك! 🙏",
      "خالتك تؤمن فيك يا حبيبي! 💜",
    ],
  },
  fr: {
    welcome: "Bienvenue",
    habibi: "mon ami",
    streakDays: "jours consécutifs",
    transactions: "transactions",
    yourGoal: "Votre Objectif",
    thisWeek: "Cette Semaine",
    transactionsLabel: "Transactions",
    saved: "Économisé",
    streak: "Série",
    days: "jours",
    auntiesTip: "Conseil de Tante",
    madeWith: "Fait avec 💜 par Tante Huda",
    tips: [
      "Faites le café à la maison! ☕️",
      "Cousin Ahmed ne commande pas! 🍕",
      "Chaque centime compte! 💰",
      "Votre futur vous remerciera! 🙏",
      "Tante croit en vous! 💜",
    ],
  },
};

interface DesktopSidebarProps {
  userName: string;
  streak: number;
  savingsGoalName: string;
  savingsGoalAmount: number;
  totalSaved: number;
  currency: string;
  totalTransactions: number;
  todayPotentialSavings?: number;
}

export function DesktopSidebar({
  userName,
  streak,
  savingsGoalName,
  savingsGoalAmount,
  totalSaved,
  currency,
  totalTransactions,
  todayPotentialSavings = 0,
}: DesktopSidebarProps) {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;
  const todayTip = t.tips[new Date().getDay() % t.tips.length];
  const dateLocale = language === "ar" ? "ar-SA" : language === "fr" ? "fr-FR" : "en-US";

  return (
    <div className="flex flex-col h-full p-5 overflow-y-auto scrollbar-hide">
      {/* Profile Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg overflow-hidden">
            <img src="/icons/huda-avatar.png" alt="خالتك هدى" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">{userName || t.habibi}</h2>
            <p className="text-sm text-[#8b7a9e]">{t.welcome} 💜</p>
          </div>
        </div>
        
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10 text-center">
            <Flame className="mx-auto text-orange-400 mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{streak}</p>
            <p className="text-xs text-[#8b7a9e]">{t.streakDays}</p>
          </div>
          <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10 text-center">
            <Trophy className="mx-auto text-amber-400 mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{totalTransactions}</p>
            <p className="text-xs text-[#8b7a9e]">{t.transactions}</p>
          </div>
        </div>
      </div>

      {/* Savings Goal */}
      {savingsGoalName && (
        <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-pink-400" />
            <h3 className="font-semibold text-white">{t.yourGoal}</h3>
          </div>
          <p className="text-sm text-[#c4b5d4] mb-4">{savingsGoalName}</p>
          <SavingsJar 
            saved={totalSaved} 
            goal={savingsGoalAmount} 
            currency={currency}
            todayPotential={todayPotentialSavings}
          />
        </div>
      )}

      {/* Weekly Stats */}
      <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-green-400" />
          <h3 className="font-semibold text-white">{t.thisWeek}</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8b7a9e]">{t.transactionsLabel}</span>
            <span className="text-white font-semibold">{totalTransactions}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8b7a9e]">{t.saved}</span>
            <span className="text-green-400 font-semibold">+{totalSaved} {currency}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8b7a9e]">{t.streak}</span>
            <span className="text-orange-400 font-semibold">{streak} {t.days}</span>
          </div>
        </div>
      </div>

      {/* Auntie's Tip */}
      <div className="bg-gradient-to-br from-purple-600/15 to-pink-600/15 rounded-xl p-4 border border-purple-500/20 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-pink-400" />
          <h3 className="font-semibold text-white text-sm">{t.auntiesTip}</h3>
        </div>
        <p className="text-sm text-[#c4b5d4] leading-relaxed">
          "{todayTip}"
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-purple-500/10">
        <p className="text-xs text-[#8b7a9e] text-center mb-1">{t.madeWith}</p>
        <p className="text-xs text-[#8b7a9e] text-center flex items-center justify-center gap-1">
          <Calendar size={12} />
          {new Date().toLocaleDateString(dateLocale, { weekday: "long", month: "short", day: "numeric" })}
        </p>
      </div>
    </div>
  );
}

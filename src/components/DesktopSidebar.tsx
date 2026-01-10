"use client";

import { Flame, Target, TrendingUp, Trophy, Calendar, Sparkles } from "lucide-react";
import { SavingsJar } from "./SavingsJar";

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
  const tips = [
    "خلي القهوة بالبيت وفر فلوسك! ☕️",
    "ابن عمك أحمد ما يطلب توصيل! 🍕",
    "كل ريال توفره يقربك لحلمك! 💰",
    "نفسك المستقبلية بتشكرك! 🙏",
    "خالتك تؤمن فيك يا حبيبي! 💜",
  ];
  
  const todayTip = tips[new Date().getDay() % tips.length];

  return (
    <div className="flex flex-col h-full p-5 overflow-y-auto scrollbar-hide">
      {/* Profile Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg overflow-hidden">
            <img src="/icons/huda-avatar.png" alt="خالتك هدى" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">{userName || "حبيبي"}</h2>
            <p className="text-sm text-[#8b7a9e]">أهلاً بك 💜</p>
          </div>
        </div>
        
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10 text-center">
            <Flame className="mx-auto text-orange-400 mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{streak}</p>
            <p className="text-xs text-[#8b7a9e]">أيام متتالية</p>
          </div>
          <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10 text-center">
            <Trophy className="mx-auto text-amber-400 mb-2" size={24} />
            <p className="text-2xl font-bold text-white">{totalTransactions}</p>
            <p className="text-xs text-[#8b7a9e]">معاملة</p>
          </div>
        </div>
      </div>

      {/* Savings Goal */}
      {savingsGoalName && (
        <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-pink-400" />
            <h3 className="font-semibold text-white">هدفك</h3>
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
          <h3 className="font-semibold text-white">هذا الأسبوع</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8b7a9e]">المعاملات</span>
            <span className="text-white font-semibold">{totalTransactions}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8b7a9e]">وفرت</span>
            <span className="text-green-400 font-semibold">+{totalSaved} {currency}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#8b7a9e]">الستريك</span>
            <span className="text-orange-400 font-semibold">{streak} يوم</span>
          </div>
        </div>
      </div>

      {/* Auntie's Tip */}
      <div className="bg-gradient-to-br from-purple-600/15 to-pink-600/15 rounded-xl p-4 border border-purple-500/20 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-pink-400" />
          <h3 className="font-semibold text-white text-sm">نصيحة خالتك</h3>
        </div>
        <p className="text-sm text-[#c4b5d4] leading-relaxed">
          "{todayTip}"
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-purple-500/10">
        <p className="text-xs text-[#8b7a9e] text-center mb-1">صنع بـ 💜 من خالتك هدى</p>
        <p className="text-xs text-[#8b7a9e] text-center flex items-center justify-center gap-1">
          <Calendar size={12} />
          {new Date().toLocaleDateString("ar-SA", { weekday: "long", month: "short", day: "numeric" })}
        </p>
      </div>
    </div>
  );
}

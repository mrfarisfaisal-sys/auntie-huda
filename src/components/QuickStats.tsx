"use client";

import { TrendingUp, TrendingDown, Target, Flame, Wallet } from "lucide-react";
import { DailySpending } from "@/types";

interface QuickStatsProps {
  spending: DailySpending;
  streak: number;
  totalSaved: number;
  currency: string;
  dailyLimit: number;
}

export function QuickStats({ 
  spending, 
  streak = 0, 
  totalSaved = 0, 
  currency = "QAR", 
  dailyLimit = 300 
}: QuickStatsProps) {
  const total = spending?.total ?? 0;
  const remaining = dailyLimit - total;
  const isOverBudget = remaining < 0;
  const percentUsed = Math.min((total / dailyLimit) * 100, 100);

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">نظرة سريعة</h2>
        <p className="text-sm text-[#8b7a9e]">إحصائياتك اليوم</p>
      </div>

      {/* Stats Grid */}
      <div className="space-y-4 flex-1">
        {/* Today's Spending */}
        <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Wallet size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-[#8b7a9e]">صرفت اليوم</p>
              <p className="text-xl font-bold text-white">
                {total.toFixed(0)} <span className="text-sm text-[#8b7a9e]">{currency}</span>
              </p>
            </div>
          </div>
          <div className="h-2 bg-[#2a1f3d] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isOverBudget ? "bg-red-500" : percentUsed > 75 ? "bg-amber-500" : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>
          <p className="text-xs text-[#8b7a9e] mt-2">
            {isOverBudget ? `تجاوزت بـ ${Math.abs(remaining).toFixed(0)} ${currency}` : `باقي ${remaining.toFixed(0)} ${currency}`}
          </p>
        </div>

        {/* Remaining Budget */}
        <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isOverBudget ? "bg-red-500/20" : "bg-green-500/20"
            }`}>
              {isOverBudget ? (
                <TrendingDown size={20} className="text-red-400" />
              ) : (
                <TrendingUp size={20} className="text-green-400" />
              )}
            </div>
            <div>
              <p className="text-xs text-[#8b7a9e]">المتبقي</p>
              <p className={`text-xl font-bold ${isOverBudget ? "text-red-400" : "text-green-400"}`}>
                {remaining.toFixed(0)} <span className="text-sm text-[#8b7a9e]">{currency}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Flame size={20} className="text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-[#8b7a9e]">أيام متتالية</p>
              <p className="text-xl font-bold text-orange-400">
                {streak} <span className="text-sm text-[#8b7a9e]">يوم</span>
              </p>
            </div>
          </div>
        </div>

        {/* Total Saved */}
        <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Target size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-[#8b7a9e]">إجمالي التوفير</p>
              <p className="text-xl font-bold text-emerald-400">
                {(totalSaved ?? 0).toFixed(0)} <span className="text-sm text-[#8b7a9e]">{currency}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer tip */}
      <div className="mt-auto pt-4 border-t border-purple-500/10">
        <p className="text-xs text-[#8b7a9e] text-center">
          💜 خالتك فخورة فيك
        </p>
      </div>
    </div>
  );
}

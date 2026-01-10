"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, Flame, Award, Calendar, PieChart, Target } from "lucide-react";
import { DailySpending } from "@/types";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts";
import { SavingsJar } from "./SavingsJar";

interface InsightsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  spending: DailySpending;
  streak: number;
  totalSaved: number;
  userName: string;
  savingsGoalName?: string;
  savingsGoalAmount?: number;
  currency?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Coffee: "#ef4444",
  Dining: "#f97316",
  Shopping: "#eab308",
  Groceries: "#22c55e",
  Transport: "#3b82f6",
  Entertainment: "#a855f7",
  Other: "#6b7280",
};

export function InsightsSheet({
  isOpen,
  onClose,
  spending,
  streak,
  totalSaved,
  userName,
  savingsGoalName,
  savingsGoalAmount,
  currency = "SAR",
}: InsightsSheetProps) {
  const categoryData = spending.transactions.reduce((acc, t) => {
    const cat = "Other";
    acc[cat] = (acc[cat] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name] || CATEGORY_COLORS.Other,
  }));

  const dailyLimit = 300;
  const percentUsed = Math.min((spending.total / dailyLimit) * 100, 100);
  const isOverBudget = spending.total > dailyLimit;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-lg lg:rounded-2xl lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 bg-[#12091c] rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto border border-purple-500/20"
          >
            <div className="sticky top-0 bg-[#12091c] p-4 border-b border-purple-500/20 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <PieChart size={24} className="text-purple-400" />
                إحصائياتك
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#2d2d4a] rounded-full transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl p-5 border border-purple-500/30">
                <p className="text-[#8b7a9e] text-sm mb-1">أهلاً {userName || "حبيبي"} 👋</p>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {spending.total.toFixed(0)} <span className="text-lg text-gray-400">{spending.currency}</span>
                </h3>
                
                <div className="relative h-3 bg-[#2d2d4a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentUsed}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`absolute h-full rounded-full ${
                      isOverBudget
                        ? "bg-gradient-to-r from-red-500 to-red-600"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {isOverBudget ? (
                    <span className="text-red-400">🚨 Over budget by {(spending.total - dailyLimit).toFixed(0)} {spending.currency}!</span>
                  ) : (
                    <span className="text-green-400">✓ {(dailyLimit - spending.total).toFixed(0)} {spending.currency} left today</span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#2d2d4a] rounded-2xl p-4 text-center">
                  <Flame className="mx-auto text-orange-400 mb-2" size={28} />
                  <p className="text-2xl font-bold text-white">{streak}</p>
                  <p className="text-xs text-[#8b7a9e]">يوم متتالي</p>
                </div>
                <div className="bg-[#2d2d4a] rounded-2xl p-4 text-center">
                  <TrendingDown className="mx-auto text-green-400 mb-2" size={28} />
                  <p className="text-2xl font-bold text-white">{totalSaved}</p>
                  <p className="text-xs text-[#8b7a9e]">وفرت</p>
                </div>
                <div className="bg-[#2d2d4a] rounded-2xl p-4 text-center">
                  <Award className="mx-auto text-yellow-400 mb-2" size={28} />
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-xs text-[#8b7a9e]">إنجازات</p>
                </div>
              </div>

              {pieData.length > 0 && (
                <div className="bg-[#2d2d4a] rounded-2xl p-5">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-purple-400" />
                    Today's Breakdown
                  </h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {pieData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2 text-sm">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-400">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {savingsGoalName && savingsGoalAmount && (
                <div className="bg-[#2d2d4a] rounded-2xl p-5">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Target size={18} className="text-purple-400" />
                    Your Goal: {savingsGoalName}
                  </h4>
                  <SavingsJar 
                    saved={totalSaved} 
                    goal={savingsGoalAmount} 
                    currency={currency} 
                  />
                </div>
              )}

              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-5 border border-yellow-500/30">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp size={18} className="text-yellow-400" />
                  Auntie's Tip of the Day
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {savingsGoalName ? (
                    <>
                      "Habibi, every riyal saved today is a riyal towards your {savingsGoalName}! 
                      Remember, Cousin Ahmed got his dream car by skipping coffee for 2 years! 
                      <span className="text-yellow-400"> You can do it too, inshallah! 🤲</span>"
                    </>
                  ) : (
                    <>
                      "Habibi, every riyal saved today is a riyal towards your future. 
                      Remember, Cousin Ahmed saved 50,000 by age 25! 
                      <span className="text-yellow-400"> You can do it too, inshallah! 🤲</span>"
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { MoreVertical, Trash2, BarChart3, Trophy, Flame, RotateCcw, MessageSquare, Users, Gift, RefreshCw } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DailySpending } from "@/types";
import { useLanguage } from "@/lib/i18n";

const TEXTS = {
  en: {
    title: "Auntie Huda",
    online: "Online now",
    clearChat: "Clear chat",
    resetDay: "Reset today",
    budgetToday: "Your budget today",
  },
  ar: {
    title: "خالتي هدى",
    online: "متصلة الآن",
    clearChat: "مسح المحادثة",
    resetDay: "إعادة تعيين اليوم",
    budgetToday: "ميزانيتك اليوم",
  },
  fr: {
    title: "Tante Huda",
    online: "En ligne",
    clearChat: "Effacer le chat",
    resetDay: "Réinitialiser",
    budgetToday: "Votre budget",
  },
};

interface ChatHeaderProps {
  spending: DailySpending;
  dailyLimit: number;
  streak: number;
  onClearHistory: () => void;
  onResetSpending: () => void;
  onOpenInsights: () => void;
  onOpenAchievements: () => void;
  onOpenConfessions?: () => void;
  onOpenReferral?: () => void;
  onOpenSquad?: () => void;
  onOpenBadges?: () => void;
  onResetAll?: () => void;
}

export function ChatHeader({ 
  spending, 
  dailyLimit,
  streak,
  onClearHistory, 
  onResetSpending,
  onOpenInsights,
  onOpenAchievements,
  onOpenConfessions,
  onOpenReferral,
  onOpenSquad,
  onOpenBadges,
  onResetAll,
}: ChatHeaderProps) {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;
  const [showMenu, setShowMenu] = useState(false);
  const percentUsed = Math.min((spending.total / dailyLimit) * 100, 100);
  const isOverBudget = spending.total > dailyLimit;
  const isWarning = percentUsed > 75 && !isOverBudget;

  return (
    <header 
      className="bg-[#1e1529]/95 backdrop-blur-md border-b border-purple-500/10 px-4 py-3 lg:px-6 lg:py-4 sticky top-0 z-10 lg:rounded-t-2xl"
      role="banner"
    >
      {/* Top row: Avatar + Name + Actions */}
      <div className="flex items-center justify-between mb-3">
        {/* Profile */}
        <div className="flex items-center gap-3">
          <div 
            className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden"
            role="img"
            aria-label="Auntie Huda avatar"
          >
            <img src="/icons/huda-avatar.png" alt="خالتك هدى" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-base">{t.title}</h1>
            <p className="text-xs text-[#c4b5d4] flex items-center gap-1.5">
              {t.online}
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" aria-hidden="true" />
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {streak >= 2 && (
            <div 
              className="flex items-center gap-1.5 bg-orange-500/15 px-2.5 py-1.5 rounded-full mr-1"
              aria-label={`${streak} day streak`}
            >
              <Flame size={14} className="text-orange-400" aria-hidden="true" />
              <span className="text-xs font-semibold text-orange-300">{streak}</span>
            </div>
          )}
          
          {onOpenConfessions && (
            <button
              onClick={onOpenConfessions}
              className="btn-ghost p-2.5 rounded-lg relative"
              aria-label="Confession Board"
            >
              <MessageSquare size={20} className="text-[#c4b5d4]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-pink-500 rounded-full" />
            </button>
          )}
          
          <button
            onClick={onOpenInsights}
            className="btn-ghost p-2.5 rounded-lg"
            aria-label="View insights"
          >
            <BarChart3 size={20} className="text-[#c4b5d4]" />
          </button>
          
          <button
            onClick={onOpenAchievements}
            className="btn-ghost p-2.5 rounded-lg"
            aria-label="View achievements"
          >
            <Trophy size={20} className="text-amber-400" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="btn-ghost p-2.5 rounded-lg"
              aria-label="More options"
              aria-expanded={showMenu}
            >
              <MoreVertical size={20} className="text-[#c4b5d4]" />
            </button>

            <AnimatePresence>
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                    aria-hidden="true"
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-[#1e1529] border border-purple-500/20 rounded-xl shadow-xl z-20 min-w-[200px] overflow-hidden"
                    role="menu"
                  >
                    <button
                      onClick={() => { onClearHistory(); setShowMenu(false); }}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-purple-500/10 flex items-center gap-3 text-[#c4b5d4] transition-colors"
                      role="menuitem"
                    >
                      <Trash2 size={16} />
                      {t.clearChat}
                    </button>
                    <button
                      onClick={() => { onResetSpending(); setShowMenu(false); }}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-purple-500/10 flex items-center gap-3 text-[#c4b5d4] transition-colors"
                      role="menuitem"
                    >
                      <RotateCcw size={16} />
                      {t.resetDay}
                    </button>
                    <div className="border-t border-purple-500/10" />
                    {onOpenReferral && (
                      <button
                        onClick={() => { onOpenReferral(); setShowMenu(false); }}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-purple-500/10 flex items-center gap-3 text-[#c4b5d4] transition-colors"
                        role="menuitem"
                      >
                        <Gift size={16} className="text-pink-400" />
                        {language === "ar" ? "ادعُ أصدقاء" : language === "fr" ? "Inviter des Amis" : "Invite Friends"}
                      </button>
                    )}
                    {onOpenSquad && (
                      <button
                        onClick={() => { onOpenSquad(); setShowMenu(false); }}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-purple-500/10 flex items-center gap-3 text-[#c4b5d4] transition-colors"
                        role="menuitem"
                      >
                        <Users size={16} className="text-blue-400" />
                        {language === "ar" ? "فريق العائلة" : language === "fr" ? "Équipe Familiale" : "Family Squad"}
                      </button>
                    )}
                    {onResetAll && (
                      <>
                        <div className="border-t border-purple-500/10" />
                        <button
                          onClick={() => { 
                            if (confirm(language === "ar" ? "هل أنت متأكد؟ سيتم مسح كل بياناتك وإعادة التسجيل." : language === "fr" ? "Êtes-vous sûr? Toutes vos données seront effacées." : "Are you sure? All your data will be cleared and you'll restart onboarding.")) {
                              onResetAll();
                              setShowMenu(false);
                              window.location.reload();
                            }
                          }}
                          className="w-full px-4 py-3 text-left text-sm hover:bg-red-500/10 flex items-center gap-3 text-red-400 transition-colors"
                          role="menuitem"
                        >
                          <RefreshCw size={16} />
                          {language === "ar" ? "إعادة تعيين كل شيء" : language === "fr" ? "Réinitialiser Tout" : "Reset Everything"}
                        </button>
                      </>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div 
        className="bg-[#150f1f] rounded-xl p-3"
        role="progressbar"
        aria-valuenow={spending.total}
        aria-valuemin={0}
        aria-valuemax={dailyLimit}
        aria-label="Daily spending progress"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-[#c4b5d4] font-medium">{t.budgetToday}</span>
          <span className={`font-bold text-sm ${
            isOverBudget ? "text-red-400" : isWarning ? "text-amber-400" : "text-white"
          }`}>
            {spending.total.toFixed(0)}
            <span className="text-[#8b7a9e] font-normal">/{dailyLimit}</span>
            <span className="text-[#8b7a9e] font-normal text-xs ml-1">{spending.currency}</span>
          </span>
        </div>
        <div className="relative h-2 bg-[#2a1f3d] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentUsed}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`absolute h-full rounded-full ${
              isOverBudget
                ? "bg-red-500"
                : isWarning
                ? "bg-amber-500"
                : "bg-gradient-to-r from-purple-500 to-pink-500"
            }`}
          />
        </div>
      </div>
    </header>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Lock, Star, Zap, Flame, Wallet, Coffee, ShoppingBag, Sparkles } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface AchievementsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  streak: number;
  totalTransactions: number;
}

export function AchievementsSheet({ isOpen, onClose, streak, totalTransactions }: AchievementsSheetProps) {
  const achievements: Achievement[] = [
    {
      id: "first_roast",
      title: "أول رد",
      description: "حصلت على أول رد من خالتك هدى",
      icon: Flame,
      color: "from-orange-500 to-red-500",
      unlocked: totalTransactions >= 1,
    },
    {
      id: "budget_warrior",
      title: "محارب الميزانية",
      description: "التزم بالميزانية لمدة 3 أيام متتالية",
      icon: Wallet,
      color: "from-green-500 to-emerald-500",
      unlocked: streak >= 3,
      progress: Math.min(streak, 3),
      maxProgress: 3,
    },
    {
      id: "streak_master",
      title: "سيد الستريك",
      description: "حافظ على 7 أيام متتالية",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      unlocked: streak >= 7,
      progress: Math.min(streak, 7),
      maxProgress: 7,
    },
    {
      id: "coffee_quitter",
      title: "تارك القهوة",
      description: "5 أيام بدون شراء قهوة",
      icon: Coffee,
      color: "from-amber-600 to-yellow-500",
      unlocked: false,
      progress: 2,
      maxProgress: 5,
    },
    {
      id: "shopaholic_reformed",
      title: "متعافي من التسوق",
      description: "قلل مصاريف التسوق 50%",
      icon: ShoppingBag,
      color: "from-pink-500 to-rose-500",
      unlocked: false,
    },
    {
      id: "aunties_favorite",
      title: "مفضل خالتك",
      description: "احصل على 10 مدحات من خالتك",
      icon: Star,
      color: "from-purple-500 to-indigo-500",
      unlocked: false,
      progress: 3,
      maxProgress: 10,
    },
    {
      id: "marriage_material",
      title: "جاهز للزواج 💍",
      description: "وفر مبلغ المهر",
      icon: Sparkles,
      color: "from-violet-500 to-purple-600",
      unlocked: false,
    },
    {
      id: "legendary_saver",
      title: "موفر أسطوري",
      description: "أكمل جميع الإنجازات",
      icon: Trophy,
      color: "from-yellow-400 to-amber-500",
      unlocked: false,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

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
                <Trophy size={24} className="text-yellow-400" />
                إنجازاتك
                <span className="text-sm font-normal text-gray-400">
                  ({unlockedCount}/{achievements.length})
                </span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[#2d2d4a] rounded-full transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative rounded-2xl p-4 border transition-all ${
                      achievement.unlocked
                        ? "bg-[#2d2d4a] border-purple-500/50"
                        : "bg-[#1f1f35] border-[#2d2d4a] opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          achievement.unlocked
                            ? `bg-gradient-to-br ${achievement.color}`
                            : "bg-[#3d3d5a]"
                        }`}
                      >
                        {achievement.unlocked ? (
                          <Icon size={28} className="text-white" />
                        ) : (
                          <Lock size={24} className="text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          {achievement.title}
                          {achievement.unlocked && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                              ✓ Unlocked
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                        
                        {achievement.progress !== undefined && achievement.maxProgress && !achievement.unlocked && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <div className="h-1.5 bg-[#3d3d5a] rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${achievement.color} rounded-full`}
                                style={{
                                  width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

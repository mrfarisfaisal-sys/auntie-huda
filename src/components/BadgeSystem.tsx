"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Lock, Sparkles, Flame, Target, Users, Zap, Crown, Diamond, Shield, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface Badge {
  id: string;
  icon: React.ReactNode;
  name: { en: string; ar: string; fr: string };
  description: { en: string; ar: string; fr: string };
  requirement: { en: string; ar: string; fr: string };
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface BadgeSystemProps {
  isOpen: boolean;
  onClose: () => void;
  streak: number;
  totalSaved: number;
  totalRoasts: number;
  referralCount: number;
}

const RARITY_COLORS = {
  common: "from-gray-500 to-gray-600",
  uncommon: "from-green-500 to-emerald-600",
  rare: "from-blue-500 to-indigo-600",
  epic: "from-purple-500 to-pink-600",
  legendary: "from-amber-400 to-orange-500",
};

const RARITY_LABELS = {
  en: { common: "Common", uncommon: "Uncommon", rare: "Rare", epic: "Epic", legendary: "Legendary" },
  ar: { common: "عادي", uncommon: "غير شائع", rare: "نادر", epic: "ملحمي", legendary: "أسطوري" },
  fr: { common: "Commun", uncommon: "Peu commun", rare: "Rare", epic: "Épique", legendary: "Légendaire" },
};

const TEXTS = {
  en: {
    title: "Achievements",
    subtitle: "Your badges of honor (and shame)",
    unlocked: "Unlocked",
    locked: "Locked",
    progress: "Progress",
    allBadges: "All Badges",
    yourBadges: "Your Badges",
  },
  ar: {
    title: "الإنجازات",
    subtitle: "شاراتك الفخرية (والمخجلة)",
    unlocked: "مفتوح",
    locked: "مقفل",
    progress: "التقدم",
    allBadges: "كل الشارات",
    yourBadges: "شاراتك",
  },
  fr: {
    title: "Succès",
    subtitle: "Vos badges d'honneur (et de honte)",
    unlocked: "Débloqué",
    locked: "Verrouillé",
    progress: "Progrès",
    allBadges: "Tous les Badges",
    yourBadges: "Vos Badges",
  },
};

export function BadgeSystem({ isOpen, onClose, streak, totalSaved, totalRoasts, referralCount }: BadgeSystemProps) {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;
  const rarityLabels = RARITY_LABELS[language] || RARITY_LABELS.en;

  const badges: Badge[] = [
    {
      id: "seedling",
      icon: <Sparkles size={24} />,
      name: { en: "Huda's Seedling", ar: "شتلة هدى", fr: "Pousse de Huda" },
      description: { en: "You've started your journey", ar: "بدأت رحلتك", fr: "Vous avez commencé" },
      requirement: { en: "Complete onboarding", ar: "أكمل التسجيل", fr: "Terminer l'onboarding" },
      rarity: "common",
      unlocked: true,
    },
    {
      id: "first_roast",
      icon: <Flame size={24} />,
      name: { en: "First Burn", ar: "أول حرق", fr: "Première Brûlure" },
      description: { en: "You survived your first roast", ar: "نجوت من أول توبيخ", fr: "Vous avez survécu" },
      requirement: { en: "Get roasted once", ar: "احصل على توبيخ", fr: "Soyez grondé une fois" },
      rarity: "common",
      unlocked: totalRoasts >= 1,
      progress: Math.min(totalRoasts, 1),
      maxProgress: 1,
    },
    {
      id: "budget_warrior",
      icon: <Shield size={24} />,
      name: { en: "Budget Warrior", ar: "محارب الميزانية", fr: "Guerrier du Budget" },
      description: { en: "7 days under budget", ar: "7 أيام تحت الميزانية", fr: "7 jours sous budget" },
      requirement: { en: "Stay under budget for 7 days", ar: "ابق تحت الميزانية 7 أيام", fr: "Restez sous budget 7 jours" },
      rarity: "uncommon",
      unlocked: streak >= 7,
      progress: Math.min(streak, 7),
      maxProgress: 7,
    },
    {
      id: "savings_starter",
      icon: <Target size={24} />,
      name: { en: "Savings Starter", ar: "بداية التوفير", fr: "Début d'Épargne" },
      description: { en: "Saved your first 100", ar: "وفرت أول 100", fr: "Économisé vos premiers 100" },
      requirement: { en: "Save 100 in total", ar: "وفر 100 إجمالاً", fr: "Économisez 100 au total" },
      rarity: "uncommon",
      unlocked: totalSaved >= 100,
      progress: Math.min(totalSaved, 100),
      maxProgress: 100,
    },
    {
      id: "savings_champion",
      icon: <Star size={24} />,
      name: { en: "Savings Champion", ar: "بطل التوفير", fr: "Champion de l'Épargne" },
      description: { en: "Saved 1000+", ar: "وفرت 1000+", fr: "Économisé 1000+" },
      requirement: { en: "Save 1000 in total", ar: "وفر 1000 إجمالاً", fr: "Économisez 1000 au total" },
      rarity: "rare",
      unlocked: totalSaved >= 1000,
      progress: Math.min(totalSaved, 1000),
      maxProgress: 1000,
    },
    {
      id: "referral_starter",
      icon: <Users size={24} />,
      name: { en: "Social Butterfly", ar: "الفراشة الاجتماعية", fr: "Papillon Social" },
      description: { en: "Invited your first friend", ar: "دعوت أول صديق", fr: "Invité votre premier ami" },
      requirement: { en: "Refer 1 friend", ar: "ادعُ صديق واحد", fr: "Parrainez 1 ami" },
      rarity: "uncommon",
      unlocked: referralCount >= 1,
      progress: Math.min(referralCount, 1),
      maxProgress: 1,
    },
    {
      id: "hudas_favorite",
      icon: <Crown size={24} />,
      name: { en: "Huda's Favorite", ar: "مفضل هدى", fr: "Favori de Huda" },
      description: { en: "You're basically family now", ar: "أنت من العائلة الآن", fr: "Vous êtes de la famille" },
      requirement: { en: "Refer 5 friends", ar: "ادعُ 5 أصدقاء", fr: "Parrainez 5 amis" },
      rarity: "rare",
      unlocked: referralCount >= 5,
      progress: Math.min(referralCount, 5),
      maxProgress: 5,
    },
    {
      id: "roast_survivor",
      icon: <Zap size={24} />,
      name: { en: "Roast Survivor", ar: "الناجي من التوبيخ", fr: "Survivant des Roasts" },
      description: { en: "50 roasts and still standing", ar: "50 توبيخ وما زلت صامداً", fr: "50 roasts et toujours debout" },
      requirement: { en: "Get roasted 50 times", ar: "احصل على 50 توبيخ", fr: "Soyez grondé 50 fois" },
      rarity: "epic",
      unlocked: totalRoasts >= 50,
      progress: Math.min(totalRoasts, 50),
      maxProgress: 50,
    },
    {
      id: "streak_master",
      icon: <Flame size={24} />,
      name: { en: "Streak Master", ar: "سيد الستريك", fr: "Maître de la Série" },
      description: { en: "30 days of discipline", ar: "30 يوم من الانضباط", fr: "30 jours de discipline" },
      requirement: { en: "Maintain a 30-day streak", ar: "حافظ على ستريك 30 يوم", fr: "Maintenez une série de 30 jours" },
      rarity: "epic",
      unlocked: streak >= 30,
      progress: Math.min(streak, 30),
      maxProgress: 30,
    },
    {
      id: "diamond_nephew",
      icon: <Diamond size={24} />,
      name: { en: "Diamond Nephew", ar: "الابن الماسي", fr: "Neveu Diamant" },
      description: { en: "The ultimate achievement", ar: "الإنجاز الأعلى", fr: "Le succès ultime" },
      requirement: { en: "Unlock all other badges", ar: "افتح كل الشارات", fr: "Débloquez tous les badges" },
      rarity: "legendary",
      unlocked: false, // Would need logic to check all others
    },
  ];

  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-x-4 bottom-4 top-auto z-50 max-w-md mx-auto max-h-[85vh] overflow-y-auto scrollbar-hide"
          >
            <div className="bg-[#12091c] rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-4 text-4xl">🏆</div>
                  <div className="absolute bottom-2 left-4 text-3xl">⭐</div>
                </div>
                <button 
                  onClick={onClose} 
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full"
                >
                  <X size={20} className="text-white" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Award size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{t.title}</h2>
                    <p className="text-amber-100 text-sm">{t.subtitle}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="bg-white/20 rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">
                      {unlockedBadges.length}/{badges.length} {t.unlocked}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Unlocked Badges */}
                {unlockedBadges.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-400" />
                      {t.yourBadges}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {unlockedBadges.map((badge, index) => (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`bg-gradient-to-br ${RARITY_COLORS[badge.rarity]} p-3 rounded-xl text-center`}
                        >
                          <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center text-white mb-2">
                            {badge.icon}
                          </div>
                          <p className="text-white text-xs font-medium truncate">
                            {badge.name[language] || badge.name.en}
                          </p>
                          <p className="text-white/60 text-[10px] mt-1">
                            {rarityLabels[badge.rarity]}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Locked Badges */}
                <div>
                  <h3 className="text-sm font-semibold text-[#8b7a9e] mb-3 flex items-center gap-2">
                    <Lock size={16} />
                    {t.locked}
                  </h3>
                  <div className="space-y-2">
                    {lockedBadges.map((badge, index) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-[#1a1025] p-3 rounded-xl flex items-center gap-3 border border-purple-500/10"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                          {badge.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-400 text-sm font-medium truncate">
                            {badge.name[language] || badge.name.en}
                          </p>
                          <p className="text-[#8b7a9e] text-xs truncate">
                            {badge.requirement[language] || badge.requirement.en}
                          </p>
                          {badge.progress !== undefined && badge.maxProgress && (
                            <div className="mt-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${RARITY_COLORS[badge.rarity]}`}
                                style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-[10px] bg-gradient-to-r ${RARITY_COLORS[badge.rarity]} text-white`}>
                          {rarityLabels[badge.rarity]}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, TrendingDown, Trophy, Heart } from "lucide-react";
import { useLanguage, Language } from "@/lib/i18n";

interface OnboardingProps {
  onComplete: (name: string, currency: string, dailyLimit: number, savingsGoal: { name: string; amount: number }) => void;
}

const SAVINGS_GOALS = {
  en: [
    { name: "Phone / Tech", emoji: "📱", defaultAmount: 5000 },
    { name: "New Car", emoji: "🚗", defaultAmount: 50000 },
    { name: "Wedding", emoji: "💍", defaultAmount: 100000 },
    { name: "Travel / Vacation", emoji: "✈️", defaultAmount: 10000 },
    { name: "Emergency Fund", emoji: "🏦", defaultAmount: 20000 },
    { name: "House / Apartment", emoji: "🏠", defaultAmount: 200000 },
    { name: "Education", emoji: "🎓", defaultAmount: 30000 },
    { name: "Other Goal", emoji: "🎯", defaultAmount: 10000 },
  ],
  ar: [
    { name: "جوال / تقنية", emoji: "📱", defaultAmount: 5000 },
    { name: "سيارة جديدة", emoji: "🚗", defaultAmount: 50000 },
    { name: "زواج", emoji: "💍", defaultAmount: 100000 },
    { name: "سفر / إجازة", emoji: "✈️", defaultAmount: 10000 },
    { name: "صندوق طوارئ", emoji: "🏦", defaultAmount: 20000 },
    { name: "بيت / شقة", emoji: "🏠", defaultAmount: 200000 },
    { name: "تعليم", emoji: "🎓", defaultAmount: 30000 },
    { name: "هدف آخر", emoji: "🎯", defaultAmount: 10000 },
  ],
  fr: [
    { name: "Téléphone / Tech", emoji: "📱", defaultAmount: 5000 },
    { name: "Nouvelle Voiture", emoji: "🚗", defaultAmount: 50000 },
    { name: "Mariage", emoji: "💍", defaultAmount: 100000 },
    { name: "Voyage / Vacances", emoji: "✈️", defaultAmount: 10000 },
    { name: "Fonds d'urgence", emoji: "🏦", defaultAmount: 20000 },
    { name: "Maison / Appartement", emoji: "🏠", defaultAmount: 200000 },
    { name: "Éducation", emoji: "🎓", defaultAmount: 30000 },
    { name: "Autre Objectif", emoji: "🎯", defaultAmount: 10000 },
  ],
};

const CURRENCIES = [
  { code: "SAR", nameEn: "Saudi Riyal", nameAr: "ريال سعودي", nameFr: "Riyal Saoudien", flag: "🇸🇦" },
  { code: "EGP", nameEn: "Egyptian Pound", nameAr: "جنيه مصري", nameFr: "Livre Égyptienne", flag: "🇪🇬" },
  { code: "USD", nameEn: "US Dollar", nameAr: "دولار أمريكي", nameFr: "Dollar US", flag: "🇺🇸" },
  { code: "AED", nameEn: "UAE Dirham", nameAr: "درهم إماراتي", nameFr: "Dirham EAU", flag: "🇦🇪" },
  { code: "KWD", nameEn: "Kuwaiti Dinar", nameAr: "دينار كويتي", nameFr: "Dinar Koweïtien", flag: "🇰🇼" },
  { code: "QAR", nameEn: "Qatari Riyal", nameAr: "ريال قطري", nameFr: "Riyal Qatari", flag: "🇶🇦" },
  { code: "BHD", nameEn: "Bahraini Dinar", nameAr: "دينار بحريني", nameFr: "Dinar Bahreïni", flag: "🇧🇭" },
  { code: "JOD", nameEn: "Jordanian Dinar", nameAr: "دينار أردني", nameFr: "Dinar Jordanien", flag: "🇯🇴" },
  { code: "OMR", nameEn: "Omani Rial", nameAr: "ريال عماني", nameFr: "Rial Omanais", flag: "🇴🇲" },
];

const DAILY_LIMITS = [100, 200, 300, 500, 750, 1000];

const TEXTS = {
  en: {
    welcome: "Hey sweetie! 👋",
    welcomeSub: "I'm Auntie Huda, your favorite auntie",
    welcomeText: "I love you like my own child, but honestly your spending...",
    welcomeHighlight: " keeps me up at night!",
    nameTitle: "What's your name?",
    nameSub: "So I know who to lecture 🔥",
    namePlaceholder: "Type your name...",
    nameHint: "Don't worry, Cousin Ahmed told me everything 👀",
    currencyTitle: "Where are you from?",
    currencySub: "Choose your currency",
    budgetTitle: "What's your daily budget?",
    budgetSub: "I'll be upset if you exceed it 😡",
    budgetHint: "Your mom will be proud if you stick to it! 🤲",
    goalTitle: "What are you saving for?",
    goalSub: "Give me a reason to yell at you 😤",
    goalPlaceholder: "What's your goal?",
    goalAmount: "Target amount",
    summaryTitle: "Here's what I'll do for you",
    summarySub: "With love and discipline 💜",
    track: "Track every penny you spend",
    roast: "Roast you for wasteful spending",
    celebrate: "Celebrate every saving with you",
    help: "Help you save for",
    next: "Next",
    start: "Let's go!",
    otherGoal: "Other Goal",
    myGoal: "my goal",
  },
  ar: {
    welcome: "أهلاً يا حبيبي! 👋",
    welcomeSub: "أنا خالتك هدى، خالتك المفضلة",
    welcomeText: "أحبك مثل ولدي، بس والله طريقة صرفك...",
    welcomeHighlight: " تسهرني بالليل!",
    nameTitle: "شو اسمك؟",
    nameSub: "عشان أعرف مين أوبخ 🔥",
    namePlaceholder: "اكتب اسمك...",
    nameHint: "لا تخاف، ابن عمك أحمد قالي كل شي 👀",
    currencyTitle: "من وين أنت؟",
    currencySub: "اختر عملتك",
    budgetTitle: "كم ميزانيتك اليومية؟",
    budgetSub: "بزعل لو تجاوزتها 😡",
    budgetHint: "أمك بتفتخر فيك لو التزمت! 🤲",
    goalTitle: "توفر لأجل شو؟",
    goalSub: "عطيني سبب أصرخ عليك 😤",
    goalPlaceholder: "شو هدفك؟",
    goalAmount: "المبلغ المستهدف",
    summaryTitle: "هذا اللي بسويه لك",
    summarySub: "بحب وبقسوة 💜",
    track: "أتابع كل ريال تصرفه",
    roast: "أوبخك على المصاريف الزايدة",
    celebrate: "أحتفل معاك بكل توفير",
    help: "أساعدك توفر لـ",
    next: "التالي",
    start: "يلا نبدأ!",
    otherGoal: "هدف آخر",
    myGoal: "هدفي",
  },
  fr: {
    welcome: "Salut mon chéri! 👋",
    welcomeSub: "Je suis Tante Huda, ta tante préférée",
    welcomeText: "Je t'aime comme mon propre enfant, mais franchement tes dépenses...",
    welcomeHighlight: " m'empêchent de dormir!",
    nameTitle: "Comment tu t'appelles?",
    nameSub: "Pour savoir qui gronder 🔥",
    namePlaceholder: "Tape ton nom...",
    nameHint: "T'inquiète, Cousin Ahmed m'a tout dit 👀",
    currencyTitle: "D'où viens-tu?",
    currencySub: "Choisis ta devise",
    budgetTitle: "Quel est ton budget quotidien?",
    budgetSub: "Je serai fâchée si tu le dépasses 😡",
    budgetHint: "Ta mère sera fière si tu respectes ça! 🤲",
    goalTitle: "Tu économises pour quoi?",
    goalSub: "Donne-moi une raison de te crier dessus 😤",
    goalPlaceholder: "C'est quoi ton objectif?",
    goalAmount: "Montant cible",
    summaryTitle: "Voici ce que je ferai pour toi",
    summarySub: "Avec amour et discipline 💜",
    track: "Suivre chaque centime que tu dépenses",
    roast: "Te gronder pour les dépenses inutiles",
    celebrate: "Célébrer chaque économie avec toi",
    help: "T'aider à économiser pour",
    next: "Suivant",
    start: "C'est parti!",
    otherGoal: "Autre Objectif",
    myGoal: "mon objectif",
  },
};

const LANGUAGES = [
  { code: "en" as Language, name: "English", flag: "🇬🇧" },
  { code: "ar" as Language, name: "العربية", flag: "🇸🇦" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const { language, setLanguage } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;
  const goals = SAVINGS_GOALS[language] || SAVINGS_GOALS.en;
  const otherGoalName = t.otherGoal;
  
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("SAR");
  const [dailyLimit, setDailyLimit] = useState(300);
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);
  const [goalAmount, setGoalAmount] = useState(5000);
  const [customGoalName, setCustomGoalName] = useState("");
  
  const getCurrencyName = (c: typeof CURRENCIES[0]) => {
    return language === "ar" ? c.nameAr : language === "fr" ? c.nameFr : c.nameEn;
  };

  const steps = [
    {
      title: "Choose Your Language",
      subtitle: "اختر لغتك • Choisissez votre langue",
      content: (
        <div className="flex flex-col gap-3">
          {LANGUAGES.map((lang) => (
            <motion.button
              key={lang.code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLanguage(lang.code)}
              className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                language === lang.code
                  ? "border-purple-500 bg-purple-500/20"
                  : "border-[#3d3d5a] bg-[#2d2d4a] hover:border-purple-500/50"
              }`}
            >
              <span className="text-3xl">{lang.flag}</span>
              <span className="font-semibold text-lg">{lang.name}</span>
            </motion.button>
          ))}
        </div>
      ),
    },
    {
      title: t.welcome,
      subtitle: t.welcomeSub,
      content: (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
          className="text-center"
        >
          <div className="w-28 h-28 mx-auto bg-gradient-to-br from-purple-500 to-purple-700 rounded-full overflow-hidden shadow-2xl mb-4">
            <img src="/icons/huda-avatar.png" alt="Auntie Huda" className="w-full h-full object-cover" />
          </div>
          <p className="text-gray-300 text-base leading-relaxed">
            {t.welcomeText}
            <span className="text-red-400">{t.welcomeHighlight}</span> 😤
          </p>
        </motion.div>
      ),
    },
    {
      title: t.nameTitle,
      subtitle: t.nameSub,
      content: (
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="w-full bg-[#2d2d4a] text-white placeholder-gray-500 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-center"
            autoFocus
          />
          <p className="text-gray-500 text-sm text-center">
            {t.nameHint}
          </p>
        </div>
      ),
    },
    {
      title: t.currencyTitle,
      subtitle: t.currencySub,
      content: (
        <div className="grid grid-cols-2 gap-2">
          {CURRENCIES.slice(0, 4).map((c) => (
            <motion.button
              key={c.code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrency(c.code)}
              className={`p-3 rounded-xl border-2 transition-all ${
                currency === c.code
                  ? "border-purple-500 bg-purple-500/20"
                  : "border-[#3d3d5a] bg-[#2d2d4a] hover:border-purple-500/50"
              }`}
            >
              <span className="text-xl mb-1 block">{c.flag}</span>
              <span className="font-semibold text-sm">{c.code}</span>
              <span className="text-xs text-gray-400 block">{getCurrencyName(c)}</span>
            </motion.button>
          ))}
        </div>
      ),
    },
    {
      title: t.budgetTitle,
      subtitle: t.budgetSub,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {DAILY_LIMITS.map((limit) => (
              <motion.button
                key={limit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDailyLimit(limit)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  dailyLimit === limit
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-[#3d3d5a] bg-[#2d2d4a] hover:border-purple-500/50"
                }`}
              >
                <span className="font-bold text-lg">{limit}</span>
                <span className="text-xs text-gray-400 block">{currency}</span>
              </motion.button>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm">
            {t.budgetHint}
          </p>
        </div>
      ),
    },
    {
      title: t.goalTitle,
      subtitle: t.goalSub,
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {goals.slice(0, 4).map((goal) => (
              <motion.button
                key={goal.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedGoal(goal);
                  setGoalAmount(goal.defaultAmount);
                }}
                className={`p-2 rounded-xl border-2 transition-all text-center ${
                  selectedGoal.name === goal.name
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-[#3d3d5a] bg-[#2d2d4a] hover:border-purple-500/50"
                }`}
              >
                <span className="text-xl block">{goal.emoji}</span>
                <span className="font-medium text-xs">{goal.name.split(" ")[0]}</span>
              </motion.button>
            ))}
          </div>
          {selectedGoal.name === otherGoalName && (
            <input
              type="text"
              value={customGoalName}
              onChange={(e) => setCustomGoalName(e.target.value)}
              placeholder={t.goalPlaceholder}
              className="w-full bg-[#2d2d4a] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}
          <div className="bg-[#2d2d4a] rounded-xl p-3">
            <label className="text-sm text-gray-400 block mb-2">{t.goalAmount} ({currency})</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
              className="w-full bg-[#1a1a2e] text-white text-xl font-bold rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
            />
          </div>
        </div>
      ),
    },
    {
      title: t.summaryTitle,
      subtitle: t.summarySub,
      content: (
        <div className="space-y-4">
          {[
            { icon: TrendingDown, text: t.track, color: "text-green-400" },
            { icon: Sparkles, text: t.roast, color: "text-red-400" },
            { icon: Trophy, text: t.celebrate, color: "text-yellow-400" },
            { icon: Heart, text: `${t.help} ${selectedGoal.emoji} ${selectedGoal.name === otherGoalName ? customGoalName || t.myGoal : selectedGoal.name}`, color: "text-pink-400" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-4 bg-[#2d2d4a] rounded-2xl p-4"
            >
              <div className={`${item.color}`}>
                <item.icon size={24} />
              </div>
              <span className="text-gray-200">{item.text}</span>
            </motion.div>
          ))}
        </div>
      ),
    },
  ];

  const canProceed = step === 2 ? name.trim().length > 0 : true;

  return (
    <div className="fixed inset-0 bg-[#1a1a2e] z-50 flex flex-col h-dvh overflow-hidden">
      <div className="flex-1 flex flex-col justify-center px-6 py-4 max-w-md mx-auto w-full min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-white"
              >
                {steps[step].title}
              </motion.h1>
              <p className="text-gray-400">{steps[step].subtitle}</p>
            </div>

            <div className="py-4">{steps[step].content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-6 max-w-md mx-auto w-full flex-shrink-0">
        <div className="flex gap-2 mb-4 justify-center">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step
                  ? "w-8 bg-purple-500"
                  : i < step
                  ? "w-4 bg-purple-500/50"
                  : "w-4 bg-[#3d3d5a]"
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (step < steps.length - 1) {
              setStep(step + 1);
            } else {
              const goalName = selectedGoal.name === otherGoalName ? customGoalName || t.myGoal : selectedGoal.name;
              onComplete(name, currency, dailyLimit, { name: goalName, amount: goalAmount });
            }
          }}
          disabled={!canProceed}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
        >
          {step === steps.length - 1 ? (
            <>
              <Sparkles size={20} />
              {t.start}
            </>
          ) : (
            <>
              {t.next}
              <ArrowRight size={20} />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

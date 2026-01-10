"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, TrendingDown, Trophy, Heart } from "lucide-react";

interface OnboardingProps {
  onComplete: (name: string, currency: string, dailyLimit: number, savingsGoal: { name: string; amount: number }) => void;
}

const SAVINGS_GOALS = [
  { name: "جوال / تقنية", emoji: "📱", defaultAmount: 5000 },
  { name: "سيارة جديدة", emoji: "🚗", defaultAmount: 50000 },
  { name: "زواج", emoji: "💍", defaultAmount: 100000 },
  { name: "سفر / إجازة", emoji: "✈️", defaultAmount: 10000 },
  { name: "صندوق طوارئ", emoji: "🏦", defaultAmount: 20000 },
  { name: "بيت / شقة", emoji: "🏠", defaultAmount: 200000 },
  { name: "تعليم", emoji: "🎓", defaultAmount: 30000 },
  { name: "هدف آخر", emoji: "🎯", defaultAmount: 10000 },
];

const CURRENCIES = [
  { code: "SAR", name: "ريال سعودي", flag: "🇸🇦" },
  { code: "AED", name: "درهم إماراتي", flag: "🇦🇪" },
  { code: "EGP", name: "جنيه مصري", flag: "🇪🇬" },
  { code: "KWD", name: "دينار كويتي", flag: "🇰🇼" },
  { code: "QAR", name: "ريال قطري", flag: "🇶🇦" },
  { code: "BHD", name: "دينار بحريني", flag: "🇧🇭" },
  { code: "JOD", name: "دينار أردني", flag: "🇯🇴" },
  { code: "OMR", name: "ريال عماني", flag: "🇴🇲" },
];

const DAILY_LIMITS = [100, 200, 300, 500, 750, 1000];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("SAR");
  const [dailyLimit, setDailyLimit] = useState(300);
  const [selectedGoal, setSelectedGoal] = useState(SAVINGS_GOALS[0]);
  const [goalAmount, setGoalAmount] = useState(5000);
  const [customGoalName, setCustomGoalName] = useState("");

  const steps = [
    {
      title: "أهلاً يا حبيبي! 👋",
      subtitle: "أنا خالتك هدى، خالتك المفضلة",
      content: (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
          className="text-center"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-purple-700 rounded-full overflow-hidden shadow-2xl mb-6">
            <img src="/icons/huda-avatar.png" alt="خالتك هدى" className="w-full h-full object-cover" />
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            أحبك مثل ولدي، بس والله طريقة صرفك... 
            <span className="text-red-400"> تسهرني بالليل!</span> 😤
          </p>
        </motion.div>
      ),
    },
    {
      title: "شو اسمك؟",
      subtitle: "عشان أعرف مين أوبخ 🔥",
      content: (
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اكتب اسمك..."
            className="w-full bg-[#2d2d4a] text-white placeholder-gray-500 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-center"
            autoFocus
            aria-label="اسمك"
          />
          <p className="text-gray-500 text-sm text-center">
            لا تخاف، ابن عمك أحمد قالي كل شي 👀
          </p>
        </div>
      ),
    },
    {
      title: "من وين أنت؟",
      subtitle: "اختر عملتك",
      content: (
        <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
          {CURRENCIES.map((c) => (
            <motion.button
              key={c.code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrency(c.code)}
              className={`p-4 rounded-2xl border-2 transition-all ${
                currency === c.code
                  ? "border-purple-500 bg-purple-500/20"
                  : "border-[#3d3d5a] bg-[#2d2d4a] hover:border-purple-500/50"
              }`}
            >
              <span className="text-2xl mb-2 block">{c.flag}</span>
              <span className="font-semibold">{c.code}</span>
              <span className="text-xs text-gray-400 block">{c.name}</span>
            </motion.button>
          ))}
        </div>
      ),
    },
    {
      title: "كم ميزانيتك اليومية؟",
      subtitle: "بزعل لو تجاوزتها 😡",
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
            أمك بتفتخر فيك لو التزمت! 🤲
          </p>
        </div>
      ),
    },
    {
      title: "توفر لأجل شو؟",
      subtitle: "عطيني سبب أصرخ عليك 😤",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-2">
            {SAVINGS_GOALS.map((goal) => (
              <motion.button
                key={goal.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedGoal(goal);
                  setGoalAmount(goal.defaultAmount);
                }}
                className={`p-3 rounded-2xl border-2 transition-all text-left ${
                  selectedGoal.name === goal.name
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-[#3d3d5a] bg-[#2d2d4a] hover:border-purple-500/50"
                }`}
              >
                <span className="text-2xl mb-1 block">{goal.emoji}</span>
                <span className="font-medium text-sm">{goal.name}</span>
              </motion.button>
            ))}
          </div>
          {selectedGoal.name === "هدف آخر" && (
            <input
              type="text"
              value={customGoalName}
              onChange={(e) => setCustomGoalName(e.target.value)}
              placeholder="شو هدفك؟"
              className="w-full bg-[#2d2d4a] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="اسم الهدف"
            />
          )}
          <div className="bg-[#2d2d4a] rounded-xl p-4">
            <label className="text-sm text-gray-400 block mb-2">المبلغ المستهدف ({currency})</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
              className="w-full bg-[#1a1a2e] text-white text-2xl font-bold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
            />
          </div>
        </div>
      ),
    },
    {
      title: "هذا اللي بسويه لك",
      subtitle: "بحب وبقسوة 💜",
      content: (
        <div className="space-y-4">
          {[
            { icon: TrendingDown, text: "أتابع كل ريال تصرفه", color: "text-green-400" },
            { icon: Sparkles, text: "أوبخك على المصاريف الزايدة", color: "text-red-400" },
            { icon: Trophy, text: "أحتفل معاك بكل توفير", color: "text-yellow-400" },
            { icon: Heart, text: `أساعدك توفر لـ ${selectedGoal.emoji} ${selectedGoal.name === "هدف آخر" ? customGoalName || "هدفك" : selectedGoal.name}`, color: "text-pink-400" },
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

  const canProceed = step === 1 ? name.trim().length > 0 : true;

  return (
    <div className="fixed inset-0 bg-[#1a1a2e] z-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-8 max-w-md mx-auto w-full">
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

            <div className="py-6">{steps[step].content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-8 max-w-md mx-auto w-full">
        <div className="flex gap-2 mb-6 justify-center">
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
              const goalName = selectedGoal.name === "هدف آخر" ? customGoalName || "هدفي" : selectedGoal.name;
              onComplete(name, currency, dailyLimit, { name: goalName, amount: goalAmount });
            }
          }}
          disabled={!canProceed}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
        >
          {step === steps.length - 1 ? (
            <>
              <Sparkles size={20} />
              يلا نبدأ!
            </>
          ) : (
            <>
              التالي
              <ArrowRight size={20} />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

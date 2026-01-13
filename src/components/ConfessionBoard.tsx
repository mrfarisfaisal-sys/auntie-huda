"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MessageCircle, Share2, Send, Flame, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface Confession {
  id: string;
  text: string;
  amount: number;
  currency: string;
  category: string;
  auntieRoast: string;
  likes: number;
  timestamp: Date;
  isLiked?: boolean;
}

interface ConfessionBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample confessions for demo (in production, these would come from a backend)
const SAMPLE_CONFESSIONS: Confession[] = [
  {
    id: "1",
    text: "I ordered Talabat 3 times today... in one day... 😭",
    amount: 180,
    currency: "SAR",
    category: "Delivery",
    auntieRoast: "THREE TIMES?! Habibi, your kitchen is crying! Even the delivery guy knows your address by heart now! 🛵💀",
    likes: 234,
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2", 
    text: "Spent 500 AED on a gaming skin... it's just pixels",
    amount: 500,
    currency: "AED",
    category: "Gaming",
    auntieRoast: "PIXELS?! You paid rent money for PIXELS?! Cousin Ahmed bought a whole car with his savings! A CAR! 🚗",
    likes: 567,
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: "3",
    text: "I have 47 Starbucks receipts this month",
    amount: 1175,
    currency: "SAR",
    category: "Coffee",
    auntieRoast: "47?! FORTY-SEVEN?! That's not a coffee habit, that's a LIFESTYLE! Your blood is 90% caramel macchiato! ☕😤",
    likes: 892,
    timestamp: new Date(Date.now() - 14400000),
  },
  {
    id: "4",
    text: "Bought new shoes because the old ones got dirty... they were 2 weeks old",
    amount: 800,
    currency: "EGP",
    category: "Shopping",
    auntieRoast: "Ya Allah! In my day we cleaned our shoes! With WATER! This generation... I need to sit down... 👟😵",
    likes: 445,
    timestamp: new Date(Date.now() - 28800000),
  },
  {
    id: "5",
    text: "I pay for 4 streaming services but only watch TikTok",
    amount: 120,
    currency: "SAR",
    category: "Entertainment",
    auntieRoast: "4 SUBSCRIPTIONS for what?! So the apps can feel lonely?! Cancel them and buy your mother a gift! 📺🤦‍♀️",
    likes: 1203,
    timestamp: new Date(Date.now() - 43200000),
  },
];

const TEXTS = {
  en: {
    title: "Confession Board",
    subtitle: "Anonymous spending confessions + Auntie's verdict",
    placeholder: "Confess your worst spending decision...",
    submit: "Confess",
    trending: "Trending",
    new: "New",
    auntieVerdict: "Auntie's Verdict",
    likes: "likes",
    share: "Share",
    yourConfession: "Your confession will be anonymous",
  },
  ar: {
    title: "لوحة الاعترافات",
    subtitle: "اعترافات مجهولة + حكم خالتك",
    placeholder: "اعترف بأسوأ قرار صرف...",
    submit: "اعترف",
    trending: "الأكثر شعبية",
    new: "جديد",
    auntieVerdict: "حكم خالتك",
    likes: "إعجاب",
    share: "شارك",
    yourConfession: "اعترافك سيكون مجهول",
  },
  fr: {
    title: "Tableau des Confessions",
    subtitle: "Confessions anonymes + Verdict de Tante",
    placeholder: "Confessez votre pire dépense...",
    submit: "Confesser",
    trending: "Tendance",
    new: "Nouveau",
    auntieVerdict: "Verdict de Tante",
    likes: "j'aime",
    share: "Partager",
    yourConfession: "Votre confession sera anonyme",
  },
};

export function ConfessionBoard({ isOpen, onClose }: ConfessionBoardProps) {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;
  const [confessions, setConfessions] = useState<Confession[]>(SAMPLE_CONFESSIONS);
  const [newConfession, setNewConfession] = useState("");
  const [activeTab, setActiveTab] = useState<"trending" | "new">("trending");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = (id: string) => {
    setConfessions(prev => prev.map(c => 
      c.id === id 
        ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked }
        : c
    ));
  };

  const handleSubmit = async () => {
    if (!newConfession.trim()) return;
    setIsSubmitting(true);
    
    // Simulate API call to get Auntie's roast
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newEntry: Confession = {
      id: Date.now().toString(),
      text: newConfession,
      amount: 0,
      currency: "SAR",
      category: "Other",
      auntieRoast: "Walahi, another one confessing! At least you're honest about your terrible decisions! 😤💜",
      likes: 0,
      timestamp: new Date(),
    };
    
    setConfessions(prev => [newEntry, ...prev]);
    setNewConfession("");
    setIsSubmitting(false);
  };

  const sortedConfessions = activeTab === "trending" 
    ? [...confessions].sort((a, b) => b.likes - a.likes)
    : [...confessions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return language === "ar" ? "الآن" : language === "fr" ? "maintenant" : "now";
    if (hours < 24) return language === "ar" ? `${hours} ساعة` : language === "fr" ? `${hours}h` : `${hours}h`;
    return language === "ar" ? `${Math.floor(hours/24)} يوم` : language === "fr" ? `${Math.floor(hours/24)}j` : `${Math.floor(hours/24)}d`;
  };

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
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-x-0 bottom-0 top-16 z-50 bg-[#12091c] rounded-t-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-purple-500/20 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Flame className="text-orange-500" size={24} />
                  {t.title}
                </h2>
                <p className="text-sm text-gray-400">{t.subtitle}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-4 border-b border-purple-500/10 flex-shrink-0">
              <button
                onClick={() => setActiveTab("trending")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "trending"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <TrendingUp size={16} />
                {t.trending}
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "new"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                <Flame size={16} />
                {t.new}
              </button>
            </div>

            {/* Confessions List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sortedConfessions.map((confession, index) => (
                <motion.div
                  key={confession.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#1a1030] rounded-2xl p-4 border border-purple-500/10"
                >
                  {/* Confession Text */}
                  <p className="text-white mb-3">{confession.text}</p>
                  
                  {/* Auntie's Roast */}
                  <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-3 mb-3">
                    <p className="text-xs text-purple-300 mb-1 font-medium">{t.auntieVerdict}:</p>
                    <p className="text-sm text-white">{confession.auntieRoast}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(confession.id)}
                        className={`flex items-center gap-1 transition-colors ${
                          confession.isLiked ? "text-pink-500" : "text-gray-400 hover:text-pink-500"
                        }`}
                      >
                        <Heart size={18} fill={confession.isLiked ? "currentColor" : "none"} />
                        <span>{confession.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors">
                        <Share2 size={18} />
                        <span>{t.share}</span>
                      </button>
                    </div>
                    <span className="text-gray-500 text-xs">{formatTime(confession.timestamp)}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* New Confession Input */}
            <div className="p-4 border-t border-purple-500/20 bg-[#0d0618] flex-shrink-0">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newConfession}
                  onChange={(e) => setNewConfession(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 bg-[#1a1030] text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={!newConfession.trim() || isSubmitting}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      {t.submit}
                    </>
                  )}
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">{t.yourConfession}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

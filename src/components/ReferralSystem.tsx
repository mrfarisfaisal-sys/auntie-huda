"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Users, Crown, Sparkles, Copy, Check, Share2, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

const APP_URL = "https://auntie-huda.vercel.app";

interface ReferralSystemProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

interface ReferralTier {
  count: number;
  reward: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

const TEXTS = {
  en: {
    title: "Invite Friends",
    subtitle: "Spread Huda's wisdom & earn rewards",
    yourCode: "Your Referral Code",
    copied: "Copied!",
    copy: "Copy",
    shareLink: "Share Link",
    friendsInvited: "Friends Invited",
    rewards: "Your Rewards",
    tier1: "Evil Huda Mode",
    tier1Desc: "Unlock extra savage roasts",
    tier2: "Influencer Badge",
    tier2Desc: "Show off your status",
    tier3: "Huda's Favorite",
    tier3Desc: "Gold avatar ring + VIP status",
    tier4: "Fortune Teller",
    tier4Desc: "Huda predicts your spending disasters",
    inviteFriend: "Invite a Friend",
    locked: "Locked",
    unlocked: "Unlocked!",
    howItWorks: "How it works",
    step1: "Share your unique code",
    step2: "Friend signs up with your code",
    step3: "Both of you get rewards!",
    whatsappShare: "Share on WhatsApp",
  },
  ar: {
    title: "ادعُ أصدقاءك",
    subtitle: "انشر حكمة خالتك واكسب مكافآت",
    yourCode: "كود الدعوة الخاص بك",
    copied: "تم النسخ!",
    copy: "نسخ",
    shareLink: "شارك الرابط",
    friendsInvited: "أصدقاء دعوتهم",
    rewards: "مكافآتك",
    tier1: "وضع هدى الشريرة",
    tier1Desc: "افتح ردود أكثر قسوة",
    tier2: "شارة المؤثر",
    tier2Desc: "تباهى بمكانتك",
    tier3: "مفضل هدى",
    tier3Desc: "إطار ذهبي + VIP",
    tier4: "قارئة الطالع",
    tier4Desc: "هدى تتنبأ بكوارثك المالية",
    inviteFriend: "ادعُ صديق",
    locked: "مقفل",
    unlocked: "مفتوح!",
    howItWorks: "كيف يعمل",
    step1: "شارك كودك الخاص",
    step2: "صديقك يسجل بكودك",
    step3: "كلاكما تحصلون على مكافآت!",
    whatsappShare: "شارك على واتساب",
  },
  fr: {
    title: "Inviter des Amis",
    subtitle: "Partagez la sagesse de Huda",
    yourCode: "Votre Code de Parrainage",
    copied: "Copié!",
    copy: "Copier",
    shareLink: "Partager le Lien",
    friendsInvited: "Amis Invités",
    rewards: "Vos Récompenses",
    tier1: "Mode Huda Méchante",
    tier1Desc: "Débloquez des roasts plus sévères",
    tier2: "Badge Influenceur",
    tier2Desc: "Montrez votre statut",
    tier3: "Favori de Huda",
    tier3Desc: "Cadre doré + statut VIP",
    tier4: "Diseuse de Bonne Aventure",
    tier4Desc: "Huda prédit vos désastres financiers",
    inviteFriend: "Inviter un Ami",
    locked: "Verrouillé",
    unlocked: "Débloqué!",
    howItWorks: "Comment ça marche",
    step1: "Partagez votre code unique",
    step2: "Votre ami s'inscrit avec votre code",
    step3: "Vous recevez tous les deux des récompenses!",
    whatsappShare: "Partager sur WhatsApp",
  },
};

export function ReferralSystem({ isOpen, onClose, userName }: ReferralSystemProps) {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);

  // Generate stable referral code
  const referralCode = `HUDA-${userName?.toUpperCase().slice(0, 4) || 'USER'}-${userName?.length || 0}X${(userName?.charCodeAt(0) || 65) % 100}`;
  const referralLink = `${APP_URL}?ref=${referralCode}`;

  useEffect(() => {
    // Load referral count from localStorage
    const stored = localStorage.getItem("huda_referral_count");
    if (stored) setReferralCount(parseInt(stored));
  }, []);

  const tiers: ReferralTier[] = [
    { count: 1, reward: t.tier1, icon: <Zap className="text-yellow-400" size={20} />, unlocked: referralCount >= 1 },
    { count: 3, reward: t.tier2, icon: <Sparkles className="text-purple-400" size={20} />, unlocked: referralCount >= 3 },
    { count: 5, reward: t.tier3, icon: <Crown className="text-amber-400" size={20} />, unlocked: referralCount >= 5 },
    { count: 10, reward: t.tier4, icon: <Gift className="text-pink-400" size={20} />, unlocked: referralCount >= 10 },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const messages = {
      en: `🔥 You HAVE to try Auntie Huda!\n\nShe's a savage AI that roasts your spending habits 😂\nI'm already addicted!\n\nUse my code for VIP access: ${referralCode}\n\n👉 ${referralLink}`,
      ar: `🔥 لازم تجرب خالتي هدى!\n\nذكاء اصطناعي يوبخك على مصاريفك 😂\nأنا مدمن عليها!\n\nاستخدم كودي للدخول VIP: ${referralCode}\n\n👈 ${referralLink}`,
      fr: `🔥 Tu DOIS essayer Tante Huda!\n\nC'est une IA qui critique tes dépenses 😂\nJe suis déjà accro!\n\nUtilise mon code pour l'accès VIP: ${referralCode}\n\n👉 ${referralLink}`,
    };
    const message = messages[language] || messages.en;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-x-4 bottom-4 top-auto z-50 max-w-md mx-auto max-h-[85vh] overflow-y-auto scrollbar-hide"
          >
            <div className="bg-[#12091c] rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-4 text-4xl">🎁</div>
                  <div className="absolute bottom-2 left-4 text-3xl">✨</div>
                </div>
                <button 
                  onClick={onClose} 
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full"
                >
                  <X size={20} className="text-white" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Users size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{t.title}</h2>
                    <p className="text-purple-100 text-sm">{t.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Referral Code */}
              <div className="p-4">
                <p className="text-xs text-[#8b7a9e] mb-2">{t.yourCode}</p>
                <div className="bg-[#1a1025] rounded-xl p-4 flex items-center justify-between border border-purple-500/20">
                  <code className="text-lg font-mono font-bold text-purple-400">{referralCode}</code>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 bg-purple-500/20 px-3 py-2 rounded-lg text-purple-300 text-sm"
                  >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    {copied ? t.copied : t.copy}
                  </button>
                </div>

                {/* Share Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppShare}
                  className="w-full mt-3 bg-[#25d366] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  {t.whatsappShare}
                </motion.button>
              </div>

              {/* Stats */}
              <div className="px-4 pb-4">
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8b7a9e] text-sm">{t.friendsInvited}</span>
                    <span className="text-3xl font-bold text-white">{referralCount}</span>
                  </div>
                </div>
              </div>

              {/* Rewards Tiers */}
              <div className="px-4 pb-4">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Gift size={16} className="text-pink-400" />
                  {t.rewards}
                </h3>
                <div className="space-y-2">
                  {tiers.map((tier, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-xl flex items-center gap-3 ${
                        tier.unlocked 
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30" 
                          : "bg-[#1a1025] border border-purple-500/10"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        tier.unlocked ? "bg-purple-500/30" : "bg-white/5"
                      }`}>
                        {tier.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${tier.unlocked ? "text-white" : "text-gray-400"}`}>
                          {tier.reward}
                        </p>
                        <p className="text-xs text-[#8b7a9e]">{tier.count} {language === "ar" ? "أصدقاء" : language === "fr" ? "amis" : "friends"}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        tier.unlocked 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-white/5 text-gray-500"
                      }`}>
                        {tier.unlocked ? t.unlocked : t.locked}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* How it works */}
              <div className="px-4 pb-6">
                <h3 className="text-sm font-semibold text-white mb-3">{t.howItWorks}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3 text-[#c4b5d4]">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-purple-400">1</span>
                    {t.step1}
                  </div>
                  <div className="flex items-center gap-3 text-[#c4b5d4]">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-purple-400">2</span>
                    {t.step2}
                  </div>
                  <div className="flex items-center gap-3 text-[#c4b5d4]">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-purple-400">3</span>
                    {t.step3}
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

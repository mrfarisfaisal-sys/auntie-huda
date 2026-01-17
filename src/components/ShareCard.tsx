"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Download, Copy, Check, MessageCircle, Instagram, QrCode, Swords } from "lucide-react";
import { useRef, useState } from "react";
import { RoastResponse } from "@/types";
import { useLanguage } from "@/lib/i18n";

const APP_URL = "https://auntie-huda.vercel.app";

interface ShareCardProps {
  isOpen: boolean;
  onClose: () => void;
  roastData: RoastResponse;
  userName: string;
}

export function ShareCard({ isOpen, onClose, roastData, userName }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const { language } = useLanguage();
  
  // Generate referral code
  const referralCode = `HUDA-${userName?.toUpperCase().slice(0,4) || 'USER'}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const referralLink = `${APP_URL}?ref=${referralCode}`;

  // Translations
  const t = {
    en: {
      shareTitle: "Share Your Roast",
      shareText: `🔥 Auntie Huda just ROASTED me!\n\n"${roastData.reply_text}"\n\n💸 ${roastData.merchant} - ${roastData.amount} ${roastData.currency}\n\nGet roasted too 👉 auntiehuda.app`,
      auntieHuda: "Auntie Huda",
      subtitle: "Your Financial Roaster",
      spentOn: "Spent on",
      madeWith: "Made with 💜 by Auntie Huda",
      wasteful: "🚨 Wasteful",
      saver: "✓ Saver",
      copy: "Copy",
      copied: "Copied!",
      saveImage: "Save Image",
      sharePrompt: "Share this roast with your friends! 😂",
      challenge: "Challenge a Friend",
      challengeText: "Think you can handle Auntie Huda?",
      qrScan: "Scan to get roasted",
    },
    ar: {
      shareTitle: "شارك التوبيخ",
      shareText: `🔥 خالتي هدى وبختني!\n\n"${roastData.reply_text}"\n\n💸 ${roastData.merchant} - ${roastData.amount} ${roastData.currency}\n\nاحصل على توبيخك 👈 auntiehuda.app`,
      auntieHuda: "خالتك هدى",
      subtitle: "مستشارتك المالية",
      spentOn: "صرفت على",
      madeWith: "صنع بـ 💜 من خالتك هدى",
      wasteful: "🚨 مبذر",
      saver: "✓ موفر",
      copy: "نسخ",
      copied: "تم النسخ!",
      saveImage: "حفظ صورة",
      sharePrompt: "شارك الرد مع أصحابك! 😂",
      challenge: "تحدى صديق",
      challengeText: "هل تقدر تتحمل خالتك هدى؟",
      qrScan: "امسح للتوبيخ",
    },
    fr: {
      shareTitle: "Partagez Votre Critique",
      shareText: `🔥 Tante Huda vient de me GRONDER!\n\n"${roastData.reply_text}"\n\n💸 ${roastData.merchant} - ${roastData.amount} ${roastData.currency}\n\nFaites-vous gronder aussi 👉 auntiehuda.app`,
      auntieHuda: "Tante Huda",
      subtitle: "Votre Critique Financière",
      spentOn: "Dépensé pour",
      madeWith: "Fait avec 💜 par Tante Huda",
      wasteful: "🚨 Gaspilleur",
      saver: "✓ Épargnant",
      copy: "Copier",
      copied: "Copié!",
      saveImage: "Sauvegarder",
      sharePrompt: "Partagez avec vos amis! 😂",
      challenge: "Défier un ami",
      challengeText: "Pouvez-vous supporter Tante Huda?",
      qrScan: "Scannez pour être grondé",
    },
  };
  const texts = t[language] || t.en;
  const shareText = texts.shareText;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Viral share messages
  const getViralWhatsAppMessage = () => {
    const messages = {
      en: `😂😂😂 You HAVE to try this app\nAuntie Huda just exposed all my spending sins\n\nShe told me: "${roastData.reply_text.slice(0, 100)}..."\n\nThink you can survive her? 👇\n${referralLink}`,
      ar: `😂😂😂 لازم تجرب هالتطبيق\nخالتي هدى طلعتلي عيوبي المالية كلها\n\nشوف وش قالتلي: "${roastData.reply_text.slice(0, 100)}..."\n\nجرب إذا تقدر تتحملها 👇\n${referralLink}`,
      fr: `😂😂😂 Tu DOIS essayer cette app\nTante Huda vient d'exposer tous mes péchés financiers\n\nElle m'a dit: "${roastData.reply_text.slice(0, 100)}..."\n\nPenses-tu pouvoir la supporter? 👇\n${referralLink}`,
    };
    return messages[language] || messages.en;
  };

  const getChallengeMessage = () => {
    const messages = {
      en: `⚔️ I challenge you to a SAVINGS BATTLE!\n\nLet's see who Auntie Huda roasts more this week 😈\nLoser buys coffee!\n\nJoin here: ${referralLink}`,
      ar: `⚔️ أتحداك في معركة التوفير!\n\nخلنا نشوف مين خالتي هدى تذبحه أكثر هالأسبوع 😈\nالخسران يشتري القهوة!\n\nسجل من هنا: ${referralLink}`,
      fr: `⚔️ Je te défie dans une BATAILLE D'ÉPARGNE!\n\nVoyons qui Tante Huda gronde le plus cette semaine 😈\nLe perdant paie le café!\n\nRejoins ici: ${referralLink}`,
    };
    return messages[language] || messages.en;
  };

  const handleWhatsApp = () => {
    const message = showChallenge ? getChallengeMessage() : getViralWhatsAppMessage();
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#1a1a2e",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `auntie-huda-roast-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error("Failed to download:", e);
    }
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto lg:max-w-lg"
          >
            <div className="bg-[#12091c] rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2 text-white">
                  <Share2 size={18} className="text-purple-400" />
                  {texts.shareTitle}
                </h3>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Shareable Card Preview */}
              <div className="p-4">
                <div
                  ref={cardRef}
                  className="bg-gradient-to-br from-purple-900 via-[#1a1a2e] to-pink-900 rounded-2xl p-6 relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 text-6xl">💸</div>
                    <div className="absolute bottom-4 left-4 text-4xl">🔥</div>
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg overflow-hidden">
                        <img src="/icons/huda-avatar.png" alt="خالتك هدى" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{texts.auntieHuda}</h4>
                        <p className="text-xs text-purple-300">{texts.subtitle}</p>
                      </div>
                    </div>

                    {/* Roast Text */}
                    <div className="bg-black/30 rounded-xl p-4 mb-4 backdrop-blur-sm">
                      <p className="text-white text-sm leading-relaxed">
                        "{roastData.reply_text}"
                      </p>
                    </div>

                    {/* Transaction */}
                    <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
                      <div>
                        <p className="text-xs text-gray-400">{texts.spentOn}</p>
                        <p className="font-semibold text-white">{roastData.merchant}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${roastData.sentiment === "negative" ? "text-red-400" : "text-green-400"}`}>
                          {roastData.amount} {roastData.currency}
                        </p>
                        <p className="text-xs text-gray-400">{roastData.category}</p>
                      </div>
                    </div>

                    {/* Footer with QR Code hint */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                          <QrCode size={32} className="text-purple-900" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400">{texts.qrScan}</p>
                          <p className="text-[8px] text-purple-400 font-mono">{referralCode}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        roastData.sentiment === "negative" 
                          ? "bg-red-500/20 text-red-300" 
                          : "bg-green-500/20 text-green-300"
                      }`}>
                        {roastData.sentiment === "negative" ? texts.wasteful : texts.saver}
                      </div>
                    </div>

                    {/* Challenge CTA */}
                    <div className="mt-3 text-center">
                      <p className="text-xs text-purple-300 font-medium">
                        {texts.challengeText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Challenge Toggle */}
                <button
                  onClick={() => setShowChallenge(!showChallenge)}
                  className={`mt-3 w-full py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    showChallenge 
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" 
                      : "bg-white/5 text-purple-300 border border-purple-500/20"
                  }`}
                >
                  <Swords size={16} />
                  {texts.challenge}
                </button>
              </div>

              {/* Share Buttons */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 bg-[#25d366] text-white py-3 rounded-xl font-medium"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTwitter}
                  className="flex items-center justify-center gap-2 bg-[#1da1f2] text-white py-3 rounded-xl font-medium"
                >
                  𝕏 Twitter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-xl font-medium"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  {copied ? texts.copied : texts.copy}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium"
                >
                  <Download size={18} />
                  {texts.saveImage}
                </motion.button>
              </div>

              <p className="text-center text-xs text-[#8b7a9e] pb-4">
                {texts.sharePrompt}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

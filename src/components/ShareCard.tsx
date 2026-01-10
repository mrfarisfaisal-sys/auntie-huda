"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Download, Copy, Check, MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
import { RoastResponse } from "@/types";

interface ShareCardProps {
  isOpen: boolean;
  onClose: () => void;
  roastData: RoastResponse;
  userName: string;
}

export function ShareCard({ isOpen, onClose, roastData, userName }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const shareText = `🔥 Auntie Huda just roasted me!\n\n"${roastData.reply_text}"\n\n💸 ${roastData.merchant} - ${roastData.amount} ${roastData.currency}\n\nGet roasted too 👉 auntiehuda.app`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
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
                  شارك الرد
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
                        <h4 className="font-bold text-white">خالتك هدى</h4>
                        <p className="text-xs text-purple-300">مستشارتك المالية</p>
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
                        <p className="text-xs text-gray-400">صرفت على</p>
                        <p className="font-semibold text-white">{roastData.merchant}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${roastData.sentiment === "negative" ? "text-red-400" : "text-green-400"}`}>
                          {roastData.amount} {roastData.currency}
                        </p>
                        <p className="text-xs text-gray-400">{roastData.category}</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        صنع بـ 💜 من خالتك هدى
                      </p>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        roastData.sentiment === "negative" 
                          ? "bg-red-500/20 text-red-300" 
                          : "bg-green-500/20 text-green-300"
                      }`}>
                        {roastData.sentiment === "negative" ? "🚨 مبذر" : "✓ موفر"}
                      </div>
                    </div>
                  </div>
                </div>
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
                  {copied ? "تم النسخ!" : "نسخ"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-xl font-medium"
                >
                  <Download size={18} />
                  حفظ صورة
                </motion.button>
              </div>

              <p className="text-center text-xs text-[#8b7a9e] pb-4">
                شارك الرد مع أصحابك! 😂
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

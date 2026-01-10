"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface LanguageSwitcherProps {
  variant?: "dropdown" | "inline";
  className?: string;
}

export function LanguageSwitcher({ variant = "dropdown", className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language);

  if (variant === "inline") {
    return (
      <div className={`flex gap-2 ${className}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              language === lang.code
                ? "bg-purple-500 text-white"
                : "bg-[#1e1529] text-[#c4b5d4] hover:bg-[#2a1f3d]"
            }`}
          >
            <span className="mr-1.5">{lang.flag}</span>
            {lang.nativeName}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1e1529] border border-purple-500/15 text-[#c4b5d4] hover:bg-[#2a1f3d] transition-colors"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe size={18} />
        <span className="text-sm">{currentLang?.flag} {currentLang?.nativeName}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 bg-[#1e1529] border border-purple-500/20 rounded-xl shadow-xl z-20 min-w-[160px] overflow-hidden"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-purple-500/10 flex items-center justify-between gap-3 text-[#c4b5d4] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                  {language === lang.code && (
                    <Check size={16} className="text-purple-400" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, languages, translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string, subkey?: string) => string;
  dir: "ltr" | "rtl";
  languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "auntie_huda_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === "en" || stored === "ar" || stored === "fr")) {
      setLanguageState(stored as Language);
    } else {
      // Detect browser language
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "ar") setLanguageState("ar");
      else if (browserLang === "fr") setLanguageState("fr");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    // Update document direction
    document.documentElement.lang = lang;
    document.documentElement.dir = languages.find(l => l.code === lang)?.dir || "ltr";
  };

  // Translation helper function
  const t = (section: string, key: string, subkey?: string): string => {
    try {
      const sectionData = (translations as Record<string, unknown>)[section];
      if (!sectionData) return key;
      
      const keyData = (sectionData as Record<string, unknown>)[key];
      if (!keyData) return key;
      
      if (subkey) {
        const subkeyData = (keyData as Record<string, unknown>)[subkey];
        if (!subkeyData) return subkey;
        
        if (typeof subkeyData === "object" && subkeyData !== null) {
          return (subkeyData as Record<string, string>)[language] || key;
        }
        return String(subkeyData);
      }
      
      if (typeof keyData === "object" && keyData !== null) {
        if (language in (keyData as Record<string, unknown>)) {
          return (keyData as Record<string, string>)[language];
        }
      }
      
      return key;
    } catch {
      return key;
    }
  };

  const dir = languages.find(l => l.code === language)?.dir || "ltr";

  // Update document attributes when language changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;
    }
  }, [language, dir, mounted]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

"use client";

import { motion } from "framer-motion";
import { SignInButton } from "@/components/AuthButton";
import { useLanguage } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Link from "next/link";

export default function SignInPage() {
  const { language } = useLanguage();

  const translations = {
    title: {
      en: "Welcome Back!",
      ar: "أهلاً وسهلاً!",
      fr: "Bienvenue!",
    },
    subtitle: {
      en: "Sign in to continue saving with Auntie Huda",
      ar: "سجل دخولك لتكمل التوفير مع خالتك هدى",
      fr: "Connectez-vous pour continuer à épargner avec Tante Huda",
    },
    noAccount: {
      en: "First time here?",
      ar: "أول مرة هنا؟",
      fr: "Première fois ici?",
    },
    signUpFree: {
      en: "Sign up free with Google",
      ar: "سجل مجاناً مع جوجل",
      fr: "Inscrivez-vous gratuitement avec Google",
    },
    backHome: {
      en: "Back to home",
      ar: "العودة للرئيسية",
      fr: "Retour à l'accueil",
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-white/10 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl mb-4">
              👩‍🦳
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {translations.title[language]}
            </h1>
            <p className="text-gray-400">
              {translations.subtitle[language]}
            </p>
          </div>

          {/* Sign In Button */}
          <div className="space-y-4">
            <SignInButton />

            <div className="text-center pt-4">
              <p className="text-gray-500 text-sm">
                {translations.noAccount[language]}{" "}
                <span className="text-purple-400">
                  {translations.signUpFree[language]}
                </span>
              </p>
            </div>
          </div>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              ← {translations.backHome[language]}
            </Link>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-center text-gray-500 text-xs mt-6 px-4">
          {language === "ar"
            ? "بالتسجيل، أنت توافق على شروط الاستخدام وسياسة الخصوصية"
            : language === "fr"
            ? "En vous inscrivant, vous acceptez nos conditions et notre politique de confidentialité"
            : "By signing in, you agree to our Terms of Service and Privacy Policy"}
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { LogIn, LogOut, User } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function AuthButton() {
  const { data: session, status } = useSession();
  const { language } = useLanguage();

  const translations = {
    signIn: { en: "Sign In", ar: "تسجيل الدخول", fr: "Connexion" },
    signOut: { en: "Sign Out", ar: "تسجيل الخروج", fr: "Déconnexion" },
    loading: { en: "Loading...", ar: "جاري التحميل...", fr: "Chargement..." },
  };

  if (status === "loading") {
    return (
      <div className="px-4 py-2 text-gray-400 text-sm">
        {translations.loading[language]}
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-8 h-8 rounded-full border-2 border-purple-500"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
              <User size={16} />
            </div>
          )}
          <span className="text-sm text-gray-300 hidden sm:block">
            {session.user.name?.split(" ")[0]}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signOut()}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">{translations.signOut[language]}</span>
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => signIn("google")}
      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all"
    >
      <LogIn size={16} />
      {translations.signIn[language]}
    </motion.button>
  );
}

export function SignInButton({ className = "" }: { className?: string }) {
  const { language } = useLanguage();

  const translations = {
    signInGoogle: { 
      en: "Continue with Google", 
      ar: "المتابعة مع جوجل", 
      fr: "Continuer avec Google" 
    },
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => signIn("google", { callbackUrl: "/chat" })}
      className={`flex items-center justify-center gap-3 w-full bg-white text-gray-800 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all ${className}`}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      {translations.signInGoogle[language]}
    </motion.button>
  );
}

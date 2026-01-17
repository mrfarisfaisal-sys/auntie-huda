"use client";

import { useState, useEffect } from "react";
import { DailySpending, ChatMessage } from "@/types";

const WELCOME_MESSAGES = {
  en: "Hey there, habibi! 👋 I'm Auntie Huda. Send me your expenses and I'll tell you the truth. Yallah, show me what you bought today! 💜",
  ar: "أهلاً يا حبيبي! 👋 أنا خالتك هدى. أرسلي مصاريفك وبقولك الحقيقة. يلا، وريني شو اشتريت اليوم! 💜",
  fr: "Salut mon chéri! 👋 Je suis Tante Huda. Envoie-moi tes dépenses et je te dirai la vérité. Allez, montre-moi ce que tu as acheté! 💜",
};

const STORAGE_KEYS = {
  DAILY_SPENDING: "auntie_huda_daily_spending",
  CHAT_HISTORY: "auntie_huda_chat_history",
};

function getTodayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function useDailySpending() {
  const [spending, setSpending] = useState<DailySpending>({
    date: getTodayKey(),
    total: 0,
    currency: "SAR",
    transactions: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.DAILY_SPENDING);
    if (stored) {
      const parsed: DailySpending = JSON.parse(stored);
      if (parsed.date === getTodayKey()) {
        setSpending(parsed);
      } else {
        const newSpending: DailySpending = {
          date: getTodayKey(),
          total: 0,
          currency: parsed.currency || "SAR",
          transactions: [],
        };
        localStorage.setItem(STORAGE_KEYS.DAILY_SPENDING, JSON.stringify(newSpending));
        setSpending(newSpending);
      }
    }
  }, []);

  const addTransaction = (merchant: string, amount: number, currency?: string) => {
    setSpending((prev) => {
      const updated: DailySpending = {
        ...prev,
        total: prev.total + amount,
        currency: currency || prev.currency,
        transactions: [
          ...prev.transactions,
          {
            merchant,
            amount,
            timestamp: new Date().toISOString(),
          },
        ],
      };
      localStorage.setItem(STORAGE_KEYS.DAILY_SPENDING, JSON.stringify(updated));
      return updated;
    });
  };

  const resetSpending = () => {
    const newSpending: DailySpending = {
      date: getTodayKey(),
      total: 0,
      currency: spending.currency,
      transactions: [],
    };
    localStorage.setItem(STORAGE_KEYS.DAILY_SPENDING, JSON.stringify(newSpending));
    setSpending(newSpending);
  };

  return { spending, addTransaction, resetSpending };
}

export function useChatHistory() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const getWelcomeMessage = (): ChatMessage => {
    const lang = (typeof window !== 'undefined' ? localStorage.getItem('auntie_huda_language') : 'en') || 'en';
    return {
      id: "welcome",
      type: "auntie",
      content: WELCOME_MESSAGES[lang as keyof typeof WELCOME_MESSAGES] || WELCOME_MESSAGES.en,
      timestamp: new Date(),
    };
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setMessages(
        parsed.map((m: ChatMessage) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }))
      );
    } else {
      setMessages([getWelcomeMessage()]);
    }
  }, []);

  const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => {
      const updated = [...prev, newMessage];
      localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(updated));
      return updated;
    });
    return newMessage;
  };

  const clearHistory = () => {
    const welcomeMessage = getWelcomeMessage();
    setMessages([welcomeMessage]);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify([welcomeMessage]));
  };

  const resetAll = () => {
    // Clear chat history
    const welcomeMessage = getWelcomeMessage();
    setMessages([welcomeMessage]);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify([welcomeMessage]));
    
    // Clear spending
    localStorage.removeItem(STORAGE_KEYS.DAILY_SPENDING);
    
    // Clear user settings (will trigger onboarding)
    localStorage.removeItem('auntie_huda_user');
    
    // Clear squad data
    localStorage.removeItem('huda_squad');
    
    // Clear referral count
    localStorage.removeItem('huda_referral_count');
  };

  return { messages, addMessage, clearHistory, resetAll };
}

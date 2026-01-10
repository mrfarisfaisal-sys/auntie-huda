"use client";

import { useState, useEffect } from "react";
import { DailySpending, ChatMessage } from "@/types";

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
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        type: "auntie",
        content:
          "أهلاً يا حبيبي! 👋 أنا خالتك هدى. أرسلي مصاريفك وبقولك الحقيقة. يلا، وريني شو اشتريت اليوم! 💜",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
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
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      type: "auntie",
      content:
        "أهلاً يا حبيبي! 👋 أنا خالتك هدى. أرسلي مصاريفك وبقولك الحقيقة. يلا، وريني شو اشتريت اليوم! 💜",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify([welcomeMessage]));
  };

  return { messages, addMessage, clearHistory };
}

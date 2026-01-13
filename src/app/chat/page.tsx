"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChatBubble, 
  ChatHeader, 
  ChatInput, 
  Onboarding,
  InsightsSheet,
  AchievementsSheet,
  StreakBanner,
  ShareCard,
  DailyChallenge,
  RewardPopup,
  TypingIndicator,
  DesktopSidebar,
  CosmicBackground,
  QuickStats,
  ConfessionBoard,
} from "@/components";
import { useDailySpending, useChatHistory } from "@/hooks/useLocalStorage";
import { RoastResponse } from "@/types";
import { useLanguage } from "@/lib/i18n";

const STORAGE_KEY_USER = "auntie_huda_user";

interface UserSettings {
  name: string;
  currency: string;
  dailyLimit: number;
  onboarded: boolean;
  streak: number;
  lastActiveDate: string;
  savingsGoalName: string;
  savingsGoalAmount: number;
  totalSaved: number;
  challengeCompleted: boolean;
  challengeDate: string;
  // Savings tracking
  lastSpendingDate: string;
  lastDaySpending: number;
  savingsHistory: { date: string; saved: number; spent: number }[];
}

export default function Home() {
  const { spending, addTransaction, resetSpending } = useDailySpending();
  const { messages, addMessage, clearHistory } = useChatHistory();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareRoast, setShareRoast] = useState<RoastResponse | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [showConfessions, setShowConfessions] = useState(false);
  const [rewardData, setRewardData] = useState<{ type: "streak" | "achievement" | "saving" | "challenge"; title: string; description: string; points: number }>({ type: "streak", title: "", description: "", points: 0 });
  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: "",
    currency: "SAR",
    dailyLimit: 300,
    onboarded: false,
    streak: 0,
    lastActiveDate: "",
    savingsGoalName: "",
    savingsGoalAmount: 5000,
    totalSaved: 0,
    challengeCompleted: false,
    challengeDate: "",
    lastSpendingDate: "",
    lastDaySpending: 0,
    savingsHistory: [],
  });
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY_USER);
    if (stored) {
      const parsed: UserSettings = JSON.parse(stored);
      const today = new Date().toISOString().split("T")[0];
      
      let newStreak = parsed.streak || 0;
      let newTotalSaved = parsed.totalSaved || 0;
      let newSavingsHistory = parsed.savingsHistory || [];
      
      // Calculate streak
      if (parsed.lastActiveDate) {
        const lastDate = new Date(parsed.lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak = (parsed.streak || 0) + 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      }
      
      // SAVINGS CALCULATION: Finalize previous day's savings
      if (parsed.lastSpendingDate && parsed.lastSpendingDate !== today) {
        const previousDaySpending = parsed.lastDaySpending || 0;
        const dailyLimit = parsed.dailyLimit || 300;
        const savedYesterday = Math.max(0, dailyLimit - previousDaySpending);
        
        if (savedYesterday > 0) {
          newTotalSaved += savedYesterday;
          newSavingsHistory = [
            ...newSavingsHistory,
            { date: parsed.lastSpendingDate, saved: savedYesterday, spent: previousDaySpending }
          ].slice(-30); // Keep last 30 days
        }
      }
      
      const updated: UserSettings = { 
        ...parsed, 
        streak: newStreak, 
        lastActiveDate: today,
        totalSaved: newTotalSaved,
        savingsHistory: newSavingsHistory,
        lastSpendingDate: parsed.lastSpendingDate || today,
        lastDaySpending: parsed.lastDaySpending || 0,
      };
      setUserSettings(updated);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      
      if (!parsed.onboarded) {
        setShowOnboarding(true);
      }
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // REAL-TIME SAVINGS TRACKING: Update spending for today
  useEffect(() => {
    if (!mounted || !userSettings.onboarded) return;
    
    const today = new Date().toISOString().split("T")[0];
    const currentSpending = spending.total;
    
    // Update today's spending record
    if (userSettings.lastSpendingDate !== today || userSettings.lastDaySpending !== currentSpending) {
      const updated = {
        ...userSettings,
        lastSpendingDate: today,
        lastDaySpending: currentSpending,
      };
      setUserSettings(updated);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
    }
  }, [spending.total, mounted, userSettings.onboarded]);

  const handleOnboardingComplete = (name: string, currency: string, dailyLimit: number, savingsGoal: { name: string; amount: number }) => {
    const today = new Date().toISOString().split("T")[0];
    const newSettings: UserSettings = {
      name,
      currency,
      dailyLimit,
      onboarded: true,
      streak: 1,
      lastActiveDate: today,
      savingsGoalName: savingsGoal.name,
      savingsGoalAmount: savingsGoal.amount,
      totalSaved: 0,
      challengeCompleted: false,
      challengeDate: "",
      lastSpendingDate: today,
      lastDaySpending: 0,
      savingsHistory: [],
    };
    setUserSettings(newSettings);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newSettings));
    setShowOnboarding(false);
    
    setTimeout(() => {
      addMessage({
        type: "auntie",
        content: `يلا ${name}! 👋 وريني شو اشتريت اليوم. تذكر، أنت توفر لـ ${savingsGoal.name}! 💜`,
      });
    }, 500);
  };

  const handleShare = (roastData: RoastResponse) => {
    setShareRoast(roastData);
    setShowShare(true);
  };

  const handleChallengeAccept = () => {
    const today = new Date().toISOString().split("T")[0];
    const updated = { ...userSettings, challengeCompleted: false, challengeDate: today };
    setUserSettings(updated);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
    
    setRewardData({
      type: "challenge",
      title: "قبلت التحدي!",
      description: "أكمله قبل منتصف الليل واكسب النقاط!",
      points: 50,
    });
    setShowReward(true);
  };

  const handleSend = async (message: string, imageBase64?: string) => {
    addMessage({
      type: "user",
      content: message || "📸 أرسلت صورة",
      image: imageBase64,
    });

    setIsLoading(true);

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          imageBase64,
          dailyTotal: spending.total,
          currency: userSettings.currency,
          language,
          savingsGoal: userSettings.savingsGoalName ? {
            name: userSettings.savingsGoalName,
            amount: userSettings.savingsGoalAmount,
          } : undefined,
        }),
      });

      const data: RoastResponse = await response.json();

      if (data.amount > 0) {
        addTransaction(data.merchant, data.amount, data.currency);
      }

      addMessage({
        type: "auntie",
        content: data.reply_text,
        roastData: data,
      });
    } catch (error) {
      console.error("Error:", error);
      addMessage({
        type: "auntie",
        content:
          "Habibi, my phone is acting up! Try again later, inshallah it will work. 📱💔",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (text: string) => {
    handleSend(`${text} ${userSettings.currency}`);
  };

  if (!mounted) {
    return (
      <div className="flex h-dvh bg-[#0d0d1a] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showOnboarding && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>

      {/* Desktop: Floating Dashboard Layout | Mobile: Full screen */}
      <div className="h-dvh bg-[#0a0612] lg:p-6 lg:flex lg:items-stretch lg:justify-center lg:gap-5">
        {/* Ambient background glow - desktop only */}
        <div className="hidden lg:block">
          <CosmicBackground />
        </div>
        
        {/* Desktop Sidebar - Floating Panel (Left) */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:flex-shrink-0 lg:bg-[#12091c] lg:rounded-2xl lg:border lg:border-purple-500/15 lg:shadow-2xl lg:shadow-purple-900/20 lg:overflow-hidden">
          <DesktopSidebar
            userName={userSettings.name}
            streak={userSettings.streak}
            savingsGoalName={userSettings.savingsGoalName}
            savingsGoalAmount={userSettings.savingsGoalAmount}
            totalSaved={userSettings.totalSaved}
            currency={userSettings.currency}
            totalTransactions={messages.filter(m => m.type === "user").length}
            todayPotentialSavings={Math.max(0, userSettings.dailyLimit - spending.total)}
          />
        </aside>

        {/* Main Chat Area - Centered Floating Panel */}
        <main className="flex-1 flex flex-col h-full bg-[#0c0814] lg:bg-[#12091c] lg:rounded-2xl lg:border lg:border-purple-500/15 lg:shadow-2xl lg:shadow-purple-900/20 lg:overflow-hidden lg:max-w-[600px] lg:flex-shrink-0 relative">
          <div className="flex flex-col h-full">
            <ChatHeader
              spending={spending}
              dailyLimit={userSettings.dailyLimit}
              streak={userSettings.streak}
              onClearHistory={clearHistory}
              onResetSpending={resetSpending}
              onOpenInsights={() => setShowInsights(true)}
              onOpenAchievements={() => setShowAchievements(true)}
              onOpenConfessions={() => setShowConfessions(true)}
            />

            <StreakBanner streak={userSettings.streak} show={messages.length <= 2} />

            <div className="flex-1 overflow-y-auto px-4 py-4 lg:px-6">
              {userSettings.onboarded && messages.length <= 3 && (
                <div className="mb-4">
                  <DailyChallenge 
                    onAccept={handleChallengeAccept}
                    completed={userSettings.challengeDate === new Date().toISOString().split("T")[0] && userSettings.challengeCompleted}
                  />
                </div>
              )}

              <AnimatePresence>
                {messages.map((msg) => (
                  <ChatBubble 
                    key={msg.id} 
                    message={msg} 
                    onShare={msg.roastData ? () => handleShare(msg.roastData!) : undefined}
                  />
                ))}
              </AnimatePresence>

              {isLoading && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            <ChatInput onSend={handleSend} isLoading={isLoading} currency={userSettings.currency} />
          </div>
        </main>

        {/* Right Stats Panel - Desktop XL only */}
        <aside className="hidden xl:flex xl:flex-col xl:w-64 xl:flex-shrink-0 xl:bg-[#12091c] xl:rounded-2xl xl:border xl:border-purple-500/15 xl:shadow-2xl xl:shadow-purple-900/20 xl:overflow-hidden">
          <QuickStats 
            spending={spending}
            streak={userSettings.streak}
            totalSaved={userSettings.totalSaved}
            currency={userSettings.currency}
            dailyLimit={userSettings.dailyLimit}
          />
        </aside>
      </div>

      <InsightsSheet
        isOpen={showInsights}
        onClose={() => setShowInsights(false)}
        spending={spending}
        streak={userSettings.streak}
        totalSaved={userSettings.totalSaved}
        userName={userSettings.name}
        savingsGoalName={userSettings.savingsGoalName}
        savingsGoalAmount={userSettings.savingsGoalAmount}
        currency={userSettings.currency}
      />

      <AchievementsSheet
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        streak={userSettings.streak}
        totalTransactions={messages.filter(m => m.type === "user").length}
      />

      {shareRoast && (
        <ShareCard
          isOpen={showShare}
          onClose={() => {
            setShowShare(false);
            setShareRoast(null);
          }}
          roastData={shareRoast}
          userName={userSettings.name}
        />
      )}

      <RewardPopup
        isOpen={showReward}
        onClose={() => setShowReward(false)}
        type={rewardData.type}
        title={rewardData.title}
        description={rewardData.description}
        points={rewardData.points}
      />

      <ConfessionBoard
        isOpen={showConfessions}
        onClose={() => setShowConfessions(false)}
      />
    </>
  );
}

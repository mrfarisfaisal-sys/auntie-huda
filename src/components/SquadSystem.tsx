"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Crown, Trophy, Plus, Copy, Check, Swords, TrendingUp, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

const APP_URL = "https://auntie-huda.vercel.app";

interface SquadMember {
  id: string;
  name: string;
  avatar?: string;
  weeklySpending: number;
  weeklySavings: number;
  streak: number;
  isLeader: boolean;
}

interface Squad {
  id: string;
  name: string;
  code: string;
  members: SquadMember[];
  weeklyGoal: number;
  createdAt: string;
}

interface SquadSystemProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userSpending: number;
  userSavings: number;
  userStreak: number;
}

const TEXTS = {
  en: {
    title: "Family Squad",
    subtitle: "Compete with family & friends",
    createSquad: "Create Squad",
    joinSquad: "Join Squad",
    squadName: "Squad Name",
    squadCode: "Squad Code",
    enterCode: "Enter squad code",
    create: "Create",
    join: "Join",
    members: "Members",
    weeklyLeaderboard: "Weekly Leaderboard",
    thisWeek: "This Week",
    totalSaved: "Total Saved",
    inviteMembers: "Invite Members",
    shareCode: "Share this code with family",
    copied: "Copied!",
    copy: "Copy Code",
    leaveSquad: "Leave Squad",
    weeklyShame: "🔥 Weekly Shame Report",
    biggestSpender: "Biggest Spender",
    topSaver: "Top Saver",
    squadGoal: "Squad Goal",
    hudaSays: "Huda says:",
    roastMessages: [
      "This family spends like they own an oil well! 💸",
      "At least you're all disappointing together 😂",
      "The family that overspends together... stays broke together!",
    ],
    you: "(You)",
    leader: "Leader",
    streak: "day streak",
    saved: "saved",
    spent: "spent",
  },
  ar: {
    title: "فريق العائلة",
    subtitle: "تنافس مع العائلة والأصدقاء",
    createSquad: "إنشاء فريق",
    joinSquad: "انضم لفريق",
    squadName: "اسم الفريق",
    squadCode: "كود الفريق",
    enterCode: "أدخل كود الفريق",
    create: "إنشاء",
    join: "انضم",
    members: "الأعضاء",
    weeklyLeaderboard: "ترتيب الأسبوع",
    thisWeek: "هذا الأسبوع",
    totalSaved: "إجمالي التوفير",
    inviteMembers: "ادعُ أعضاء",
    shareCode: "شارك الكود مع العائلة",
    copied: "تم النسخ!",
    copy: "نسخ الكود",
    leaveSquad: "مغادرة الفريق",
    weeklyShame: "🔥 تقرير العار الأسبوعي",
    biggestSpender: "أكبر مبذر",
    topSaver: "أفضل موفر",
    squadGoal: "هدف الفريق",
    hudaSays: "خالتك تقول:",
    roastMessages: [
      "هالعائلة تصرف كأنها تملك بئر نفط! 💸",
      "على الأقل كلكم مخيبين للآمال مع بعض 😂",
      "العائلة اللي تصرف مع بعض... تفلس مع بعض!",
    ],
    you: "(أنت)",
    leader: "القائد",
    streak: "يوم متتالي",
    saved: "وفر",
    spent: "صرف",
  },
  fr: {
    title: "Équipe Familiale",
    subtitle: "Rivalisez avec famille et amis",
    createSquad: "Créer une Équipe",
    joinSquad: "Rejoindre une Équipe",
    squadName: "Nom de l'Équipe",
    squadCode: "Code de l'Équipe",
    enterCode: "Entrez le code",
    create: "Créer",
    join: "Rejoindre",
    members: "Membres",
    weeklyLeaderboard: "Classement Hebdomadaire",
    thisWeek: "Cette Semaine",
    totalSaved: "Total Économisé",
    inviteMembers: "Inviter des Membres",
    shareCode: "Partagez ce code avec la famille",
    copied: "Copié!",
    copy: "Copier le Code",
    leaveSquad: "Quitter l'Équipe",
    weeklyShame: "🔥 Rapport de Honte Hebdomadaire",
    biggestSpender: "Plus Gros Dépensier",
    topSaver: "Meilleur Épargnant",
    squadGoal: "Objectif d'Équipe",
    hudaSays: "Huda dit:",
    roastMessages: [
      "Cette famille dépense comme si elle possédait un puits de pétrole! 💸",
      "Au moins vous êtes tous décevants ensemble 😂",
      "La famille qui dépense ensemble... reste fauchée ensemble!",
    ],
    you: "(Vous)",
    leader: "Leader",
    streak: "jours consécutifs",
    saved: "économisé",
    spent: "dépensé",
  },
};

export function SquadSystem({ isOpen, onClose, userName, userSpending, userSavings, userStreak }: SquadSystemProps) {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;
  const [view, setView] = useState<"menu" | "create" | "join" | "squad">("menu");
  const [squadName, setSquadName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [squad, setSquad] = useState<Squad | null>(null);

  useEffect(() => {
    // Load squad from localStorage
    const stored = localStorage.getItem("huda_squad");
    if (stored) {
      setSquad(JSON.parse(stored));
      setView("squad");
    }
  }, [isOpen]);

  const generateCode = () => {
    return `SQD-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  };

  const handleCreateSquad = () => {
    if (!squadName.trim()) return;
    
    const newSquad: Squad = {
      id: Date.now().toString(),
      name: squadName,
      code: generateCode(),
      members: [
        {
          id: "1",
          name: userName || "You",
          weeklySpending: userSpending,
          weeklySavings: userSavings,
          streak: userStreak,
          isLeader: true,
        },
      ],
      weeklyGoal: 1000,
      createdAt: new Date().toISOString(),
    };
    
    setSquad(newSquad);
    localStorage.setItem("huda_squad", JSON.stringify(newSquad));
    setView("squad");
  };

  const handleJoinSquad = () => {
    if (!joinCode.trim()) return;
    
    // In a real app, this would verify the code with a backend
    // For now, create a mock squad
    const mockSquad: Squad = {
      id: Date.now().toString(),
      name: "Family Squad",
      code: joinCode,
      members: [
        {
          id: "0",
          name: "أحمد",
          weeklySpending: 850,
          weeklySavings: 150,
          streak: 5,
          isLeader: true,
        },
        {
          id: "1",
          name: userName || "You",
          weeklySpending: userSpending,
          weeklySavings: userSavings,
          streak: userStreak,
          isLeader: false,
        },
      ],
      weeklyGoal: 1000,
      createdAt: new Date().toISOString(),
    };
    
    setSquad(mockSquad);
    localStorage.setItem("huda_squad", JSON.stringify(mockSquad));
    setView("squad");
  };

  const handleCopyCode = async () => {
    if (!squad) return;
    await navigator.clipboard.writeText(squad.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareSquad = () => {
    if (!squad) return;
    const messages = {
      en: `👨‍👩‍👧‍👦 Join our Family Squad on Auntie Huda!\n\nLet's compete to see who saves the most (and who gets roasted the hardest 😂)\n\nSquad Code: ${squad.code}\nJoin here: ${APP_URL}`,
      ar: `👨‍👩‍👧‍👦 انضم لفريق عائلتنا في خالتي هدى!\n\nخلنا نتنافس مين يوفر أكثر (ومين خالتي تذبحه 😂)\n\nكود الفريق: ${squad.code}\nانضم من هنا: ${APP_URL}`,
      fr: `👨‍👩‍👧‍👦 Rejoignez notre Équipe Familiale sur Tante Huda!\n\nCompétitionnons pour voir qui économise le plus 😂\n\nCode: ${squad.code}\nRejoignez: ${APP_URL}`,
    };
    window.open(`https://wa.me/?text=${encodeURIComponent(messages[language] || messages.en)}`, "_blank");
  };

  const handleLeaveSquad = () => {
    localStorage.removeItem("huda_squad");
    setSquad(null);
    setView("menu");
  };

  const sortedMembers = squad?.members.sort((a, b) => b.weeklySavings - a.weeklySavings) || [];
  const biggestSpender = squad?.members.reduce((a, b) => a.weeklySpending > b.weeklySpending ? a : b);
  const topSaver = squad?.members.reduce((a, b) => a.weeklySavings > b.weeklySavings ? a : b);

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
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-4 text-4xl">👨‍👩‍👧‍👦</div>
                  <div className="absolute bottom-2 left-4 text-3xl">🏆</div>
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
                    <p className="text-blue-100 text-sm">{t.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                {/* Menu View */}
                {view === "menu" && (
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setView("create")}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                      <Plus size={20} />
                      {t.createSquad}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setView("join")}
                      className="w-full bg-[#1a1025] text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 border border-purple-500/20"
                    >
                      <Users size={20} />
                      {t.joinSquad}
                    </motion.button>
                  </div>
                )}

                {/* Create View */}
                {view === "create" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-[#8b7a9e] mb-2 block">{t.squadName}</label>
                      <input
                        type="text"
                        value={squadName}
                        onChange={(e) => setSquadName(e.target.value)}
                        placeholder={language === "ar" ? "عائلة الأحمد" : "The Smiths"}
                        className="w-full bg-[#1a1025] text-white px-4 py-3 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCreateSquad}
                      disabled={!squadName.trim()}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium disabled:opacity-50"
                    >
                      {t.create}
                    </motion.button>
                    <button
                      onClick={() => setView("menu")}
                      className="w-full text-[#8b7a9e] text-sm"
                    >
                      ← Back
                    </button>
                  </div>
                )}

                {/* Join View */}
                {view === "join" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-[#8b7a9e] mb-2 block">{t.squadCode}</label>
                      <input
                        type="text"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                        placeholder="SQD-XXXX"
                        className="w-full bg-[#1a1025] text-white px-4 py-3 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/50 font-mono text-center text-lg"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleJoinSquad}
                      disabled={!joinCode.trim()}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium disabled:opacity-50"
                    >
                      {t.join}
                    </motion.button>
                    <button
                      onClick={() => setView("menu")}
                      className="w-full text-[#8b7a9e] text-sm"
                    >
                      ← Back
                    </button>
                  </div>
                )}

                {/* Squad View */}
                {view === "squad" && squad && (
                  <div className="space-y-4">
                    {/* Squad Name & Code */}
                    <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-white text-lg">{squad.name}</h3>
                        <div className="flex items-center gap-2">
                          <code className="text-purple-400 font-mono text-sm">{squad.code}</code>
                          <button onClick={handleCopyCode} className="text-purple-400">
                            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={handleShareSquad}
                        className="w-full bg-[#25d366] text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                      >
                        <Users size={16} />
                        {t.inviteMembers}
                      </button>
                    </div>

                    {/* Weekly Shame Report */}
                    <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl p-4 border border-red-500/20">
                      <h4 className="text-sm font-bold text-white mb-3">{t.weeklyShame}</h4>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-red-500/10 rounded-lg p-3 text-center">
                          <p className="text-xs text-red-300 mb-1">{t.biggestSpender}</p>
                          <p className="font-bold text-red-400">{biggestSpender?.name}</p>
                        </div>
                        <div className="bg-green-500/10 rounded-lg p-3 text-center">
                          <p className="text-xs text-green-300 mb-1">{t.topSaver}</p>
                          <p className="font-bold text-green-400">{topSaver?.name}</p>
                        </div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3">
                        <p className="text-xs text-[#8b7a9e] mb-1">{t.hudaSays}</p>
                        <p className="text-sm text-white italic">
                          "{t.roastMessages[Math.floor(Math.random() * t.roastMessages.length)]}"
                        </p>
                      </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="bg-[#1a1025] rounded-xl p-4 border border-purple-500/20">
                      <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Trophy size={16} className="text-amber-400" />
                        {t.weeklyLeaderboard}
                      </h4>
                      <div className="space-y-2">
                        {sortedMembers.map((member, index) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center gap-3 p-3 rounded-xl ${
                              index === 0 
                                ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30" 
                                : "bg-white/5"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? "bg-amber-500 text-black" :
                              index === 1 ? "bg-gray-400 text-black" :
                              index === 2 ? "bg-orange-700 text-white" :
                              "bg-purple-500/20 text-purple-400"
                            }`}>
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-white text-sm flex items-center gap-2">
                                {member.name}
                                {member.isLeader && <Crown size={12} className="text-amber-400" />}
                                {member.name === userName && <span className="text-xs text-purple-400">{t.you}</span>}
                              </p>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-green-400">+{member.weeklySavings} {t.saved}</span>
                                <span className="text-orange-400 flex items-center gap-1">
                                  <Flame size={10} />
                                  {member.streak}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-red-400 text-sm font-medium">-{member.weeklySpending}</p>
                              <p className="text-[10px] text-[#8b7a9e]">{t.spent}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Leave Squad */}
                    <button
                      onClick={handleLeaveSquad}
                      className="w-full text-red-400 text-sm py-2"
                    >
                      {t.leaveSquad}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

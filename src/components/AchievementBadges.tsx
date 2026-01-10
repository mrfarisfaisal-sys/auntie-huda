"use client";

import { motion } from "framer-motion";

interface Badge {
  id: number;
  icon: string;
  label: string;
  rank: string;
  color: string;
  unlocked: boolean;
}

interface AchievementBadgesProps {
  streak: number;
  totalSaved: number;
  totalTransactions: number;
}

export function AchievementBadges({ streak, totalSaved, totalTransactions }: AchievementBadgesProps) {
  const badges: Badge[] = [
    { 
      id: 1, 
      icon: "☕", 
      label: "ملك التوصيل", 
      rank: `#${Math.max(1, 100 - totalTransactions)}`,
      color: "from-amber-500 to-orange-600",
      unlocked: totalTransactions >= 5
    },
    { 
      id: 2, 
      icon: "🚗", 
      label: "حليم البرديوم", 
      rank: `#${Math.max(1, 50 - streak)}`,
      color: "from-pink-500 to-rose-600",
      unlocked: streak >= 3
    },
    { 
      id: 3, 
      icon: "👑", 
      label: "خلع الدنقهوم", 
      rank: "#1",
      color: "from-purple-500 to-violet-600",
      unlocked: totalSaved >= 100
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-sm">العملات 🏆</h3>
        <span className="text-purple-400 text-xs">اضغط للمشاركة</span>
      </div>
      
      <div className="flex justify-between gap-2">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 relative ${!badge.unlocked && "opacity-40"}`}
          >
            {/* Crown for top rank */}
            {badge.unlocked && index === 2 && (
              <motion.div 
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👑
              </motion.div>
            )}
            
            {/* Badge card */}
            <div className={`glass-card rounded-xl p-3 text-center ${badge.unlocked ? "purple-glow" : ""}`}>
              {/* Icon with glow */}
              <motion.div 
                className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl mb-2 ${badge.unlocked ? "gold-glow" : ""}`}
                animate={badge.unlocked ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {badge.icon}
              </motion.div>
              
              {/* Rank */}
              <p className={`text-xs font-bold mb-1 ${badge.unlocked ? "text-yellow-400" : "text-gray-500"}`}>
                {badge.rank}
              </p>
              
              {/* Label */}
              <p className="text-[10px] text-purple-300 leading-tight">
                {badge.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

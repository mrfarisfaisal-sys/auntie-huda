"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div 
      className="flex items-end gap-3 mb-4"
      role="status"
      aria-label="خالتك تكتب"
    >
      {/* Avatar */}
      <div 
        className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 overflow-hidden"
        aria-hidden="true"
      >
        <img src="/icons/huda-avatar.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      {/* Typing bubble */}
      <div className="bg-[#1e1529] border border-purple-500/15 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                y: [0, -4, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <span className="text-xs text-[#8b7a9e] mt-1.5 block">خالتك تكتب...</span>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { ChatMessage } from "@/types";

interface ChatBubbleProps {
  message: ChatMessage;
  onShare?: () => void;
}

export function ChatBubble({ message, onShare }: ChatBubbleProps) {
  const isUser = message.type === "user";
  const canShare = !isUser && message.roastData && message.roastData.amount > 0;

  // Sentiment labels - consistent Arabic
  const sentimentLabel = {
    positive: "موفر 👍",
    negative: "مبذر 😬", 
    neutral: "عادي"
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"} mb-4`}
      role="article"
      aria-label={isUser ? "Your message" : "Auntie Huda's message"}
    >
      {/* Avatar - only for Auntie */}
      {!isUser && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 shadow-lg overflow-hidden"
        >
          <img src="/icons/huda-avatar.png" alt="خالتك هدى" className="w-full h-full object-cover" />
        </motion.div>
      )}
      
      {/* Message bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-purple-600 text-white rounded-br-md"
            : "bg-[#1e1529] border border-purple-500/15 text-white rounded-bl-md"
        }`}
      >
        {/* Image attachment */}
        {message.image && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img
              src={message.image}
              alt="صورة مرفقة"
              className="max-w-full h-auto"
            />
          </div>
        )}
        
        {/* Message text */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        
        {/* Transaction info - simplified */}
        {message.roastData && message.roastData.amount > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  message.roastData.sentiment === "positive" 
                    ? "bg-green-500/20 text-green-400" 
                    : message.roastData.sentiment === "negative" 
                    ? "bg-red-500/20 text-red-400" 
                    : "bg-white/10 text-[#c4b5d4]"
                }`}>
                  {sentimentLabel[message.roastData.sentiment as keyof typeof sentimentLabel] || "عادي"}
                </span>
                <span className="text-sm text-[#c4b5d4]">{message.roastData.merchant}</span>
              </div>
              <span className="font-semibold text-white">
                {message.roastData.amount} {message.roastData.currency}
              </span>
            </div>
          </div>
        )}
        
        {/* Footer: timestamp + share */}
        <div className={`flex items-center gap-3 mt-2 ${isUser ? "justify-end" : "justify-between"}`}>
          <time 
            className="text-xs text-[#8b7a9e]"
            dateTime={message.timestamp.toISOString()}
          >
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </time>
          
          {canShare && onShare && (
            <button
              onClick={(e) => { e.stopPropagation(); onShare(); }}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="مشاركة هذا الرد"
            >
              <Share2 size={14} className="text-[#c4b5d4]" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

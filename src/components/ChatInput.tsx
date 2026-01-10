"use client";

import { useState, useRef } from "react";
import { Send, ImagePlus, X, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string, imageBase64?: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!message.trim() && !imagePreview) || isLoading) return;

    onSend(message.trim(), imagePreview || undefined);
    setMessage("");
    setImagePreview(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("الرجاء اختيار صورة");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const canSend = (message.trim() || imagePreview) && !isLoading;

  return (
    <div 
      className="bg-[#1e1529]/95 backdrop-blur-md border-t border-purple-500/10 px-4 py-3 lg:px-6 lg:py-4 sticky bottom-0 lg:rounded-b-2xl"
      role="form"
      aria-label="Send message"
    >
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <img
            src={imagePreview}
            alt="معاينة الصورة"
            className="h-20 rounded-xl border border-purple-500/20"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors"
            aria-label="إزالة الصورة"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          ref={fileInputRef}
          className="hidden"
          aria-hidden="true"
        />

        {/* Image upload button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn-ghost p-2.5 rounded-xl"
          disabled={isLoading}
          aria-label="إرفاق صورة"
        >
          <ImagePlus size={22} className="text-[#c4b5d4]" />
        </button>

        {/* Text input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب مصروفك... مثال: ستاربكس 25 ريال"
          className="flex-1 bg-[#150f1f] text-white placeholder-[#8b7a9e] rounded-xl px-4 py-3 text-sm border border-purple-500/10 focus:outline-none focus:border-purple-500/30 transition-colors"
          disabled={isLoading}
          aria-label="رسالتك"
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={!canSend}
          className={`p-3 rounded-xl transition-all ${
            canSend 
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90" 
              : "bg-[#2a1f3d] text-[#8b7a9e] cursor-not-allowed"
          }`}
          aria-label="إرسال"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </form>

      {/* Helper text */}
      <p className="text-xs text-[#8b7a9e] text-center mt-2">
        صوّر رسالة البنك أو اكتب المبلغ مباشرة
      </p>
    </div>
  );
}

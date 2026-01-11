"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ImagePlus, X, Loader2, Coffee, UtensilsCrossed, ShoppingBag, Car, ShoppingCart, Receipt } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ChatInputProps {
  onSend: (message: string, imageBase64?: string) => void;
  isLoading: boolean;
  currency?: string;
}

const EXPENSE_TEMPLATES = [
  { id: "coffee", icon: Coffee, emoji: "☕", labelEn: "Coffee", labelAr: "قهوة", labelFr: "Café" },
  { id: "delivery", icon: UtensilsCrossed, emoji: "🛵", labelEn: "Delivery", labelAr: "توصيل", labelFr: "Livraison" },
  { id: "shopping", icon: ShoppingBag, emoji: "🛍️", labelEn: "Shopping", labelAr: "تسوق", labelFr: "Shopping" },
  { id: "transport", icon: Car, emoji: "🚗", labelEn: "Transport", labelAr: "مواصلات", labelFr: "Transport" },
  { id: "groceries", icon: ShoppingCart, emoji: "🛒", labelEn: "Groceries", labelAr: "بقالة", labelFr: "Courses" },
  { id: "receipt", icon: Receipt, emoji: "🧾", labelEn: "Receipt", labelAr: "فاتورة", labelFr: "Reçu" },
];

export function ChatInput({ onSend, isLoading, currency = "QAR" }: ChatInputProps) {
  const { language } = useLanguage();
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  // Focus amount input when template selected
  useEffect(() => {
    if (selectedTemplate && amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, [selectedTemplate]);

  const getLabel = (template: typeof EXPENSE_TEMPLATES[0]) => {
    return language === "ar" ? template.labelAr : language === "fr" ? template.labelFr : template.labelEn;
  };

  const handleTemplateSelect = (templateId: string) => {
    if (selectedTemplate === templateId) {
      setSelectedTemplate(null);
      setAmount("");
    } else {
      setSelectedTemplate(templateId);
      setAmount("");
    }
  };

  const handleTemplateSubmit = () => {
    if (!selectedTemplate || !amount || isNaN(parseFloat(amount))) return;
    const template = EXPENSE_TEMPLATES.find(t => t.id === selectedTemplate);
    if (!template) return;
    
    const expenseMessage = `${template.emoji} ${getLabel(template)} — ${currency} ${amount}`;
    onSend(expenseMessage);
    setSelectedTemplate(null);
    setAmount("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If template is selected, validate amount
    if (selectedTemplate) {
      handleTemplateSubmit();
      return;
    }
    
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

  const canSend = ((message.trim() || imagePreview) || (selectedTemplate && amount && !isNaN(parseFloat(amount)))) && !isLoading;
  
  const placeholder = language === "ar" 
    ? "اكتب مصروفك... مثال: ستاربكس 25 ريال" 
    : language === "fr" 
    ? "Tapez votre dépense... ex: Starbucks 25" 
    : "Type your expense... e.g., Starbucks 25";
  
  const helperText = language === "ar"
    ? "صوّر الفاتورة أو اختر قالب سريع"
    : language === "fr"
    ? "Capturez le reçu ou utilisez un modèle rapide"
    : "Capture receipt or use a quick template";

  return (
    <div 
      className="bg-[#1e1529]/95 backdrop-blur-md border-t border-purple-500/10 px-4 py-3 lg:px-6 lg:py-4 sticky bottom-0 lg:rounded-b-2xl"
      role="form"
      aria-label="Send message"
    >
      {/* Quick Action Templates */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-2">
        {EXPENSE_TEMPLATES.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => handleTemplateSelect(template.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all ${
                isSelected
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-[#150f1f] border border-purple-500/10 text-[#c4b5d4] hover:border-purple-500/30"
              }`}
            >
              <Icon size={16} />
              <span>{getLabel(template)}</span>
            </button>
          );
        })}
      </div>

      {/* Template Amount Input */}
      {selectedTemplate && (
        <div className="flex items-center gap-3 mb-3 p-3 bg-[#150f1f] rounded-xl border border-purple-500/20">
          <span className="text-lg">
            {EXPENSE_TEMPLATES.find(t => t.id === selectedTemplate)?.emoji}
          </span>
          <span className="text-[#c4b5d4] text-sm">
            {getLabel(EXPENSE_TEMPLATES.find(t => t.id === selectedTemplate)!)}
          </span>
          <span className="text-[#8b7a9e]">—</span>
          <span className="text-[#c4b5d4] text-sm">{currency}</span>
          <input
            ref={amountInputRef}
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 bg-transparent text-white text-lg font-semibold placeholder-[#8b7a9e] focus:outline-none max-w-[100px]"
          />
          <button
            type="button"
            onClick={() => { setSelectedTemplate(null); setAmount(""); }}
            className="p-1.5 text-[#8b7a9e] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="h-20 rounded-xl border border-purple-500/20"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors"
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
        />

        {/* Image upload button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn-ghost p-2.5 rounded-xl"
          disabled={isLoading}
        >
          <ImagePlus size={22} className="text-[#c4b5d4]" />
        </button>

        {/* Text input - hidden when template selected */}
        {!selectedTemplate && (
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-[#150f1f] text-white placeholder-[#8b7a9e] rounded-xl px-4 py-3 text-sm border border-purple-500/10 focus:outline-none focus:border-purple-500/30 transition-colors"
            disabled={isLoading}
          />
        )}
        
        {selectedTemplate && (
          <div className="flex-1 text-[#8b7a9e] text-sm">
            {language === "ar" ? "أدخل المبلغ أعلاه" : language === "fr" ? "Entrez le montant ci-dessus" : "Enter amount above"}
          </div>
        )}

        {/* Send button */}
        <button
          type="submit"
          disabled={!canSend}
          className={`p-3 rounded-xl transition-all ${
            canSend 
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90" 
              : "bg-[#2a1f3d] text-[#8b7a9e] cursor-not-allowed"
          }`}
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
        {helperText}
      </p>
    </div>
  );
}

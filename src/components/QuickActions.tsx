"use client";

interface QuickActionsProps {
  onSelect: (text: string) => void;
}

const QUICK_ACTIONS = [
  { emoji: "☕", label: "قهوة", example: "ستاربكس 25" },
  { emoji: "🍔", label: "توصيل", example: "طلبات 45" },
  { emoji: "🛍️", label: "تسوق", example: "زارا 200" },
  { emoji: "🚗", label: "مواصلات", example: "اوبر 35" },
  { emoji: "🛒", label: "بقالة", example: "كارفور 150" },
];

export function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <nav 
      className="px-4 py-3"
      aria-label="Quick actions"
    >
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => onSelect(action.example)}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1e1529] border border-purple-500/10 text-[#c4b5d4] text-sm hover:bg-[#2a1f3d] hover:border-purple-500/20 transition-colors"
            aria-label={`${action.label}: ${action.example}`}
          >
            <span aria-hidden="true">{action.emoji}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

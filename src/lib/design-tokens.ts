/**
 * Design Tokens - Auntie Huda
 * Centralized design system for consistency
 */

export const colors = {
  // Primary backgrounds
  bg: {
    primary: "#0a0612",      // Main app background
    secondary: "#0c0814",    // Mobile chat background
    card: "#12091c",         // Floating panels
    elevated: "#1e1529",     // Headers, inputs
    input: "#150f1f",        // Input fields
    hover: "#2a1f3d",        // Hover states
  },
  
  // Purple palette
  purple: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
  },
  
  // Text colors
  text: {
    primary: "#ffffff",
    secondary: "#c4b5d4",
    muted: "#8b7a9e",
    disabled: "#5a4d6b",
  },
  
  // Border colors
  border: {
    subtle: "rgba(168, 85, 247, 0.1)",
    default: "rgba(168, 85, 247, 0.15)",
    strong: "rgba(168, 85, 247, 0.2)",
    focus: "rgba(168, 85, 247, 0.3)",
  },
  
  // Semantic colors
  success: {
    bg: "rgba(34, 197, 94, 0.1)",
    border: "rgba(34, 197, 94, 0.2)",
    text: "#4ade80",
  },
  warning: {
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.2)",
    text: "#fbbf24",
  },
  error: {
    bg: "rgba(239, 68, 68, 0.1)",
    border: "rgba(239, 68, 68, 0.2)",
    text: "#f87171",
  },
  streak: {
    bg: "rgba(249, 115, 22, 0.15)",
    text: "#fb923c",
  },
};

export const spacing = {
  xs: "0.25rem",   // 4px
  sm: "0.5rem",    // 8px
  md: "0.75rem",   // 12px
  lg: "1rem",      // 16px
  xl: "1.25rem",   // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "2rem",   // 32px
};

export const borderRadius = {
  sm: "0.5rem",    // 8px
  md: "0.75rem",   // 12px
  lg: "1rem",      // 16px
  xl: "1.25rem",   // 20px
  "2xl": "1.5rem", // 24px
  full: "9999px",
};

export const fontSize = {
  xs: "0.75rem",   // 12px
  sm: "0.875rem",  // 14px
  base: "1rem",    // 16px
  lg: "1.125rem",  // 18px
  xl: "1.25rem",   // 20px
  "2xl": "1.5rem", // 24px
};

export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
  md: "0 4px 6px rgba(0, 0, 0, 0.4)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.5)",
  xl: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  purple: "0 0 40px rgba(168, 85, 247, 0.1)",
};

// Tailwind class helpers
export const tw = {
  // Card styles
  card: "bg-[#1e1529] border border-purple-500/15 rounded-xl",
  cardHover: "hover:bg-[#2a1f3d] hover:border-purple-500/20 transition-colors",
  
  // Button styles
  btnPrimary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl px-4 py-2",
  btnGhost: "text-[#c4b5d4] hover:bg-purple-500/10 rounded-xl px-4 py-2 transition-colors",
  
  // Input styles
  input: "bg-[#150f1f] text-white placeholder-[#8b7a9e] border border-purple-500/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/30 transition-colors",
  
  // Text styles
  textPrimary: "text-white",
  textSecondary: "text-[#c4b5d4]",
  textMuted: "text-[#8b7a9e]",
};

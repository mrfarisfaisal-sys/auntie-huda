import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Only create client if credentials are available
export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : null;

// Database types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  image?: string;
  currency: string;
  daily_limit: number;
  savings_goal: string;
  savings_target: number;
  total_saved: number;
  streak: number;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  merchant: string;
  category: string;
  date: string;
  created_at: string;
}

export interface DailySpending {
  id: string;
  user_id: string;
  date: string;
  total_spent: number;
  budget: number;
  saved: number;
}

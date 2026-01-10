export interface RoastResponse {
  merchant: string;
  amount: number;
  currency: string;
  category: string;
  sentiment: "positive" | "negative" | "neutral";
  reply_text: string;
}

export interface ChatMessage {
  id: string;
  type: "user" | "auntie";
  content: string;
  timestamp: Date;
  image?: string;
  roastData?: RoastResponse;
}

export interface DailySpending {
  date: string;
  total: number;
  currency: string;
  transactions: {
    merchant: string;
    amount: number;
    timestamp: string;
  }[];
}

# خالتك هدى - مستشارتك المالية 👩‍🦳💜
# Auntie Huda - Finance Roast AI

خالتك العربية اللي تحاسبك على مصاريفك بحب! مساعد مالي بشخصية عربية أصيلة.

Your favorite Arab auntie who roasts your spending habits with love! A personality-driven financial assistant for the MENA region.

## المميزات | Features

- **واجهة محادثة عربية** - تصميم RTL كامل مع خط Noto Sans Arabic
- **تتبع المصاريف الذكي** - اكتب "ستاربكس 25 ريال" أو صور رسالة البنك
- **GPT-4o Vision** - يقرأ صور الرسائل البنكية تلقائياً
- **أهداف التوفير** - حدد هدفك (جوال، سيارة، زواج) وتابع تقدمك
- **تحديات يومية** - تحديات توفير يومية مع مكافآت
- **إنجازات ومستويات** - نظام إنجازات لتحفيزك
- **الستريك** - تتبع أيامك المتتالية تحت الميزانية
- **مشاركة الردود** - شارك ردود خالتك مع أصحابك
- **PWA** - ثبته على جوالك كتطبيق

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
```

> Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your phone or browser.

## Usage

1. **Text Input**: Type your transaction like `Starbucks 25 SAR` or `Sephora 200 AED`
2. **Image Upload**: Click the image icon to upload a screenshot of your bank SMS
3. **Get Roasted**: Auntie Huda will analyze your spending and give you her honest (and dramatic) opinion!

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o with Vision
- **Icons**: Lucide React
- **Storage**: Local Storage for chat history and daily spending

## Project Structure

```
src/
├── app/
│   ├── api/roast/route.ts    # OpenAI API endpoint
│   ├── page.tsx              # Main chat interface
│   ├── layout.tsx            # PWA metadata
│   └── globals.css           # Theme styles
├── components/
│   ├── ChatBubble.tsx        # Message bubbles
│   ├── ChatHeader.tsx        # Header with spending total
│   └── ChatInput.tsx         # Input with image upload
├── hooks/
│   └── useLocalStorage.ts    # Spending & chat persistence
├── lib/
│   └── prompt.ts             # Auntie Huda system prompt
└── types/
    └── index.ts              # TypeScript interfaces
```

## Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/auntie-huda)

### Manual Deploy

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add the following environment variables in Vercel dashboard:

### Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 |
| `NEXTAUTH_URL` | Your app URL (e.g., https://yourapp.vercel.app) |
| `NEXTAUTH_SECRET` | Random secret for NextAuth (generate with `openssl rand -base64 32`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |

### Setting Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourapp.vercel.app/api/auth/callback/google` (production)

### Setting Up Supabase

1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the schema from `supabase-schema.sql`
4. Copy your project URL and anon key from Settings → API

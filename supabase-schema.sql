-- Supabase Database Schema for Auntie Huda
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  image text,
  currency text default 'SAR',
  daily_limit numeric default 200,
  savings_goal text default 'general',
  savings_target numeric default 10000,
  total_saved numeric default 0,
  streak integer default 0,
  language text default 'en',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Transactions table
create table if not exists public.transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  amount numeric not null,
  merchant text,
  category text,
  date date default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Daily spending summary
create table if not exists public.daily_spending (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  date date default current_date,
  total_spent numeric default 0,
  budget numeric default 200,
  saved numeric default 0,
  unique(user_id, date)
);

-- Achievements table
create table if not exists public.achievements (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  achievement_id text not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, achievement_id)
);

-- Chat history (optional - for persistent chat)
create table if not exists public.chat_messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  role text not null, -- 'user' or 'assistant'
  content text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create indexes for better performance
create index if not exists idx_transactions_user_id on public.transactions(user_id);
create index if not exists idx_transactions_date on public.transactions(date);
create index if not exists idx_daily_spending_user_id on public.daily_spending(user_id);
create index if not exists idx_daily_spending_date on public.daily_spending(date);
create index if not exists idx_chat_messages_user_id on public.chat_messages(user_id);

-- Row Level Security (RLS) policies
alter table public.users enable row level security;
alter table public.transactions enable row level security;
alter table public.daily_spending enable row level security;
alter table public.achievements enable row level security;
alter table public.chat_messages enable row level security;

-- Users can only access their own data
create policy "Users can view own profile" on public.users
  for select using (auth.uid()::text = id::text);

create policy "Users can update own profile" on public.users
  for update using (auth.uid()::text = id::text);

-- Transactions policies
create policy "Users can view own transactions" on public.transactions
  for select using (auth.uid()::text = user_id::text);

create policy "Users can insert own transactions" on public.transactions
  for insert with check (auth.uid()::text = user_id::text);

-- Daily spending policies
create policy "Users can view own daily spending" on public.daily_spending
  for select using (auth.uid()::text = user_id::text);

create policy "Users can insert own daily spending" on public.daily_spending
  for insert with check (auth.uid()::text = user_id::text);

create policy "Users can update own daily spending" on public.daily_spending
  for update using (auth.uid()::text = user_id::text);

-- Achievements policies
create policy "Users can view own achievements" on public.achievements
  for select using (auth.uid()::text = user_id::text);

create policy "Users can insert own achievements" on public.achievements
  for insert with check (auth.uid()::text = user_id::text);

-- Chat messages policies
create policy "Users can view own messages" on public.chat_messages
  for select using (auth.uid()::text = user_id::text);

create policy "Users can insert own messages" on public.chat_messages
  for insert with check (auth.uid()::text = user_id::text);

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger for users table
create trigger on_users_updated
  before update on public.users
  for each row execute procedure public.handle_updated_at();

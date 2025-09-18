import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const SUPABASE_URL = supabaseUrl
export const SUPABASE_ANON_KEY = supabaseAnonKey
export const IS_SUPABASE_CONFIGURED = Boolean(supabaseUrl && supabaseAnonKey)

// Client-side Supabase client
export const createClientComponentClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

// Server-side Supabase client
// Service role client (for admin operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service role client (for admin operations) - only create if service key is provided
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  : null;

// Types for our database
export interface Profile {
  id: string
  username: string
  avatar_url?: string
  created_at: string
  total_games: number
  total_wins: number
  best_streak: number
  is_premium: boolean
}

export interface UserPreferences {
  user_id: string
  theme: 'light' | 'dark'
  sound_enabled: boolean
  notifications_enabled: boolean
}

export interface GameRoom {
  id: string
  room_code: string
  name: string
  host_id: string
  settings: {
    max_players: number
    category: string
    difficulty: string
    time_per_question: number
    total_rounds: number
    is_private: boolean
  }
  players: Array<{
    user_id: string
    username: string
    avatar_url?: string
    is_ready: boolean
    joined_at: string
  }>
  status: 'waiting' | 'in-progress' | 'finished'
  created_at: string
  started_at?: string
  finished_at?: string
}

export interface Question {
  id: string
  question: string
  options: string[]
  correct_answer: string
  explanation?: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  created_by?: string
  is_verified: boolean
  usage_count: number
  average_correct_rate: number
}
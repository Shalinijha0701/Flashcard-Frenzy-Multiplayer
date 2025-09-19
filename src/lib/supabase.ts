import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Always provide valid URLs to avoid client creation errors
const DUMMY_URL = 'https://placeholder-url.supabase.co';
const DUMMY_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSJ9.gr3oMJCyPi_J6WnVl5yl1tc9k5RPJssR3oMazgY3Qbk';

// Check if environment variables are properly configured
const hasValidSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== '<your_supabase_url>' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== '<your_supabase_anon_key>'
);

const supabaseUrl = hasValidSupabaseConfig ? process.env.NEXT_PUBLIC_SUPABASE_URL! : DUMMY_URL;
const supabaseAnonKey = hasValidSupabaseConfig ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! : DUMMY_KEY;
const supabaseServiceKey = hasValidSupabaseConfig ? (process.env.SUPABASE_SERVICE_ROLE_KEY || '') : '';

export const SUPABASE_URL = supabaseUrl;
export const SUPABASE_ANON_KEY = supabaseAnonKey;
export const IS_SUPABASE_CONFIGURED = hasValidSupabaseConfig;

// Create a dummy client that returns empty data for all operations
const createDummyClient = () => {
  const dummyClient = createClient(DUMMY_URL, DUMMY_KEY);
  // Override methods to return empty data
  const emptyResponse = { data: null, error: null };
  dummyClient.auth = {
    ...dummyClient.auth,
    getUser: async () => ({ data: { user: null }, error: null }),
    signOut: async () => emptyResponse,
    signInWithPassword: async () => emptyResponse,
    signInWithOAuth: async () => emptyResponse,
    signUp: async () => emptyResponse,
  } as any;
  return dummyClient;
};

// Client-side Supabase client
export const createClientComponentClient = () => {
  if (!hasValidSupabaseConfig) {
    return createDummyClient();
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

// Server-side Supabase client
export const supabase: SupabaseClient = hasValidSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : createDummyClient();

// Service role client (for admin operations)
export const supabaseAdmin: SupabaseClient | null = hasValidSupabaseConfig && supabaseServiceKey ? 
  createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  }) : createDummyClient();

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
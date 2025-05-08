import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

// Client for browser and public API calls
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations that require elevated privileges
// Should only be used in server components or server actions
export const adminSupabase = () => {
  if (!supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }
  
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// Helper to create a client with user's access token to make authenticated requests
// This is useful for client components that need to make authenticated requests
export const getUserSupabase = (accessToken: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  });
};

// Types for Supabase Auth
export type SupabaseUser = Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user'];
export type SupabaseSession = Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']; 
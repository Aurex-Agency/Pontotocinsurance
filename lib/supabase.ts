import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ndgzmalrirbbeqbrgrjo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZ3ptYWxyaXJiYmVxYnJncmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MDcwNjUsImV4cCI6MjA5Nzk4MzA2NX0.KVsSoNhC-FSr0lJJI-WYwrIWxS1rrgObIcjE8shhzd8'
// The service-role key is a secret and must NEVER be committed. Supply it via the
// SUPABASE_SERVICE_ROLE_KEY environment variable (set in Vercel and .env.local).
// Falls back to the public anon key so builds and public reads still succeed;
// privileged admin writes require the real service-role key to be present.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// For server-side operations that require elevated permissions
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
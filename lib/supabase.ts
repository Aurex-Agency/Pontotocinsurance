import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yeqisjuwcqumsynmlcqf.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllcWlzanV3Y3F1bXN5bm1sY3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODIzNzgsImV4cCI6MjA3MzM1ODM3OH0.OMPAPQGr__wkaBdKdeIjmizxnLd4EvxLnJtXrgCzJFw'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllcWlzanV3Y3F1bXN5bm1sY3FmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzc4MjM3OCwiZXhwIjoyMDczMzU4Mzc4fQ.EwovtNRrC7eHlKfmO1bvvK2anjDXvPo4iG9N6tSxDEg'

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
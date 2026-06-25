'use client'

import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yeqisjuwcqumsynmlcqf.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllcWlzanV3Y3F1bXN5bm1sY3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3ODIzNzgsImV4cCI6MjA3MzM1ODM3OH0.OMPAPQGr__wkaBdKdeIjmizxnLd4EvxLnJtXrgCzJFw'

// Create a client-side specific Supabase client
export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)

'use client'

import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ndgzmalrirbbeqbrgrjo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZ3ptYWxyaXJiYmVxYnJncmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MDcwNjUsImV4cCI6MjA5Nzk4MzA2NX0.KVsSoNhC-FSr0lJJI-WYwrIWxS1rrgObIcjE8shhzd8'

// Create a client-side specific Supabase client
export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)

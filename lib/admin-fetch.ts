'use client'
import { supabase } from './supabase'

export async function adminFetch(path: string, options: RequestInit = {}) {
  if (!path.startsWith('/api/') || path.startsWith('//')) throw new Error('Admin requests must use a local API route')
  const { data } = await supabase.auth.getSession()
  const headers = new Headers(options.headers)
  if (data.session?.access_token) headers.set('authorization', `Bearer ${data.session.access_token}`)
  return fetch(path, { ...options, headers, cache: 'no-store' })
}

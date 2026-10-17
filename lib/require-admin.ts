import { NextResponse } from 'next/server'
import { supabase } from './supabase'

// The allowlist is server configuration. User-editable metadata is never authority.
export async function requireAdmin(request: Request): Promise<NextResponse | null> {
  const token = request.headers.get('authorization')?.match(/^Bearer ([^\s]+)$/i)?.[1]
  if (!token) return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
  const allowed = (process.env.ADMIN_USER_IDS || '').split(',').map(id => id.trim()).filter(Boolean)
  if (!allowed.length) return NextResponse.json({ success: false, error: 'Admin access is not configured' }, { status: 503 })
  try {
    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data.user) return NextResponse.json({ success: false, error: 'Invalid session' }, { status: 401 })
    if (!allowed.includes(data.user.id)) return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    return null
  } catch {
    return NextResponse.json({ success: false, error: 'Unable to verify session' }, { status: 503 })
  }
}

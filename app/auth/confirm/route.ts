import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/admin/reset-password'

  console.log('Auth confirm - token_hash:', token_hash, 'type:', type, 'next:', next)

  if (token_hash && type) {
    // Create a server-side Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    
    console.log('Auth confirm - verifyOtp error:', error)
    
    if (!error) {
      // Redirect to the specified next URL (should be /admin/reset-password for password reset)
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // If there's an error or missing parameters, redirect to an error page
  const errorUrl = new URL('/admin/login', request.url)
  errorUrl.searchParams.set('error', 'invalid_reset_link')
  console.log('Auth confirm - redirecting to error page:', errorUrl.toString())
  return NextResponse.redirect(errorUrl)
}

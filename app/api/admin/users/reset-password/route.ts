import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }

    console.log('Attempting to send password reset email to:', email)

    // Send password reset email using regular client (this actually sends the email)
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://pontotocinsuranceagency.com'}/admin/reset-password`
    })

    if (error) {
      console.error('Error generating password reset link:', error)
      
      // Check for rate limit error specifically
      if (error.message.includes('rate limit') || error.message.includes('429')) {
        return NextResponse.json({ 
          success: false, 
          error: 'Email rate limit exceeded. Please wait a few minutes before trying again.' 
        }, { status: 429 })
      }
      
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    console.log('Password reset email sent successfully:', data)

    return NextResponse.json({ 
      success: true, 
      message: 'Password reset email sent successfully' 
    })
  } catch (error) {
    console.error('Error in reset password API:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

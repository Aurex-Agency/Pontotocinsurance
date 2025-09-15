import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// GET - Fetch all quote requests
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching quote requests:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// POST - Create new quote request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, additional_info } = body

    if (!name || !email || !service_type) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and service type are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('quote_requests')
      .insert([{
        name,
        email,
        phone: phone || null,
        service_type,
        additional_info: additional_info || null,
        status: 'new',
        created_at: new Date().toISOString()
      }])

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error creating quote request:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

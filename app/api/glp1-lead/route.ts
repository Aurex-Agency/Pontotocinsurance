import { NextRequest, NextResponse } from 'next/server'

// Inbound lead handler for the /glp1-quiz funnel.
//
// Forwards the captured lead (name, phone, email) plus every quiz answer to a
// GoHighLevel inbound webhook. The webhook URL is kept server side in the
// GHL_WEBHOOK_URL environment variable so it is never exposed in the browser.
// Set it in Vercel (Project Settings > Environment Variables) before go-live.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, phone, email } = body || {}

    // Basic server side validation. The client validates too, but never trust
    // the client alone.
    if (!firstName || !phone || !email) {
      return NextResponse.json(
        { success: false, error: 'First name, phone, and email are required.' },
        { status: 400 }
      )
    }

    const webhookUrl = process.env.GHL_WEBHOOK_URL

    const payload = {
      ...body,
      source: 'GLP-1 Bridge Quiz Funnel',
      page: '/glp1-quiz',
      submittedAt: new Date().toISOString(),
    }

    if (!webhookUrl) {
      // No webhook configured yet (placeholder stage). Log so the lead can be
      // recovered from server logs, and let the funnel continue so the user
      // still reaches the result and booking step.
      console.warn(
        '[glp1-lead] GHL_WEBHOOK_URL is not set. Lead was not forwarded:',
        JSON.stringify(payload)
      )
      return NextResponse.json({ success: true, forwarded: false })
    }

    const ghlResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!ghlResponse.ok) {
      console.error(
        '[glp1-lead] GoHighLevel webhook returned',
        ghlResponse.status,
        await ghlResponse.text().catch(() => '')
      )
      // Still return success so the user is not blocked from booking a call.
      // The warning above is enough for us to follow up manually.
      return NextResponse.json({ success: true, forwarded: false })
    }

    return NextResponse.json({ success: true, forwarded: true })
  } catch (error) {
    console.error('[glp1-lead] Unexpected error:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please call us instead.' },
      { status: 500 }
    )
  }
}

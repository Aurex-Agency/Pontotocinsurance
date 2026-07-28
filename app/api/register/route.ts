import { NextResponse } from 'next/server'
import { CONSENT_TEXT, WEBINAR_SOURCE } from '@/lib/webinar-1'

export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Accepts a US phone in any common format and returns +1XXXXXXXXXX, or null.
function toE164(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  const ten =
    digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
  if (ten.length !== 10 || ten[0] === '0' || ten[0] === '1') return null
  return `+1${ten}`
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : ''
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phoneRaw = typeof body.phone === 'string' ? body.phone.trim() : ''

  if (!firstName || !lastName || !email || !phoneRaw) {
    return NextResponse.json(
      { ok: false, error: 'All four fields are required.' },
      { status: 400 }
    )
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'That email address does not look complete.' },
      { status: 400 }
    )
  }
  const phone = toE164(phoneRaw)
  if (!phone) {
    return NextResponse.json(
      { ok: false, error: 'That phone number needs 10 digits.' },
      { status: 400 }
    )
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('/api/register: GHL_WEBHOOK_URL is not set')
    return NextResponse.json(
      { ok: false, error: 'Registration is not configured.' },
      { status: 500 }
    )
  }

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://pontotocinsuranceagency.com'
  ).replace(/\/+$/, '')
  const watchPath = `/watch-webinar-1?e=${encodeURIComponent(email)}`
  const watchUrl = `${siteUrl}${watchPath}`

  // Await the webhook and verify it accepted the lead. A fire-and-forget here
  // would silently drop registrations with no way to notice.
  let response: Response
  try {
    response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        watchUrl,
        consentText: CONSENT_TEXT,
        consentAt: new Date().toISOString(),
        source: WEBINAR_SOURCE,
      }),
    })
  } catch (err) {
    console.error('/api/register: webhook request failed', err)
    return NextResponse.json(
      { ok: false, error: 'We could not save your registration.' },
      { status: 502 }
    )
  }

  if (!response.ok) {
    console.error(`/api/register: webhook returned ${response.status}`)
    return NextResponse.json(
      { ok: false, error: 'We could not save your registration.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true, redirect: watchPath })
}

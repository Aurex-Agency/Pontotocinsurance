import { NextResponse } from 'next/server'
import { CONSENT_TEXT, WEBINAR_SOURCE } from '@/lib/webinar-1'

export const dynamic = 'force-dynamic'

// Dedicated GHL inbound webhook for the /webinar-1 funnel. GHL_WEBHOOK_URL
// overrides it if the endpoint ever needs to be rotated without a deploy.
const DEFAULT_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/MCFdomwXH4RRN6HkJgry/webhook-trigger/6f22d4b6-fb7d-4609-ba6f-8de75ef8d08d'

const SITE_URL = 'https://pontotocinsuranceagency.com'

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

  const webhookUrl = process.env.GHL_WEBHOOK_URL || DEFAULT_WEBHOOK_URL

  // No PII in the URL — the watch page is not gated and GHL already has the
  // contact, so the link carries nothing.
  const watchPath = '/watch-webinar-1'
  const watchUrl = `${SITE_URL}${watchPath}`

  // Ad attribution passed through from the landing page, allowlisted.
  const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'fbclid',
  ] as const
  const attribution: Record<string, string> = {}
  for (const key of UTM_KEYS) {
    const value = body[key]
    if (typeof value === 'string' && value.trim()) {
      attribution[key] = value.trim().slice(0, 250)
    }
  }

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
        ...attribution,
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

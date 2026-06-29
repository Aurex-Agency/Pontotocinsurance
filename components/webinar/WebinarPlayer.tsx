'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Volume2, FileDown, CheckCircle } from 'lucide-react'

// ---------------------------------------------------------------------------
// CONFIG — replace these with your real assets.
//   • Video: drop an MP4 at public/webinar/webinar.mp4, OR set
//     NEXT_PUBLIC_WEBINAR_VIDEO_URL to a direct video URL.
//     (An MP4 / direct file is required so seeking can be disabled — a YouTube
//      or Vimeo embed cannot block fast-forwarding.)
//   • PDF: drop the file at public/webinar/free-guide.pdf, OR set
//     NEXT_PUBLIC_WEBINAR_PDF_URL.
// ---------------------------------------------------------------------------
const WEBINAR_VIDEO_SRC =
  process.env.NEXT_PUBLIC_WEBINAR_VIDEO_URL || '/webinar/webinar.mp4'
const FREE_PDF_URL =
  process.env.NEXT_PUBLIC_WEBINAR_PDF_URL || '/webinar/free-guide.pdf'
const OPTIN_AFTER_SECONDS = 60

const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/MCFdomwXH4RRN6HkJgry/webhook-trigger/3433cf41-731f-4a93-9074-2c37e3c9c0a2'

export default function WebinarPlayer() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const maxWatchedRef = useRef(0) // furthest point reached (blocks seeking)
  const optinTriggeredRef = useRef(false)

  const [lead, setLead] = useState<{ firstName: string; lastName: string } | null>(null)
  const [checked, setChecked] = useState(false)
  const [muted, setMuted] = useState(true)
  const [showOptin, setShowOptin] = useState(false)
  const [optinDone, setOptinDone] = useState(false)
  const [form, setForm] = useState({ phone: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Gate: must have registered on /webinarlink first.
  useEffect(() => {
    try {
      const raw = localStorage.getItem('webinar_lead')
      if (!raw) {
        router.replace('/webinarlink')
        return
      }
      setLead(JSON.parse(raw))
      setChecked(true)
    } catch {
      router.replace('/webinarlink')
    }
  }, [router])

  // Playback control: autoplay muted, block seeking, track real watch time.
  useEffect(() => {
    if (!checked) return
    const v = videoRef.current
    if (!v) return

    v.muted = true
    v.play().catch(() => {})

    let watched = 0

    const onTimeUpdate = () => {
      // Block fast-forward beyond the furthest point actually watched.
      if (v.currentTime > maxWatchedRef.current + 1) {
        v.currentTime = maxWatchedRef.current
        return
      }
      maxWatchedRef.current = Math.max(maxWatchedRef.current, v.currentTime)
    }

    const onSeeking = () => {
      // Snap any manual seek (forward or backward) back to where they were.
      if (Math.abs(v.currentTime - maxWatchedRef.current) > 1) {
        v.currentTime = maxWatchedRef.current
      }
    }

    // Count only actual playback time toward the 60s opt-in trigger.
    const interval = setInterval(() => {
      if (!v.paused && !v.ended) {
        watched += 0.5
        if (watched >= OPTIN_AFTER_SECONDS && !optinTriggeredRef.current) {
          optinTriggeredRef.current = true
          setShowOptin(true)
        }
      }
    }, 500)

    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('seeking', onSeeking)
    return () => {
      clearInterval(interval)
      v.removeEventListener('timeupdate', onTimeUpdate)
      v.removeEventListener('seeking', onSeeking)
    }
  }, [checked])

  const enableSound = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    v.play().catch(() => {})
    setMuted(false)
  }

  const submitOptin = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: lead?.firstName,
          lastName: lead?.lastName,
          email: form.email,
          phone: form.phone,
          source: 'Webinar: PDF Opt-in',
          timestamp: new Date().toISOString(),
        }),
      })
      setOptinDone(true)
    } catch (err) {
      console.error('Webinar opt-in webhook failed:', err)
      // Still deliver the PDF — the lead capture is best-effort.
      setOptinDone(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (!checked) {
    return (
      <div className="min-h-screen bg-secondary-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-400" />
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-secondary-900 text-white">
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-2xl lg:text-3xl font-bold">
              {lead?.firstName ? `Welcome, ${lead.firstName}! ` : ''}Your Webinar Is
              Starting
            </h1>
            <p className="text-secondary-200 mt-1">
              Watch through to the end for your free resource.
            </p>
          </div>

          {/* Video */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
            <video
              ref={videoRef}
              src={WEBINAR_VIDEO_SRC}
              playsInline
              autoPlay
              muted
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-contain bg-black"
            />

            {/* Click-to-unmute notification */}
            {muted && (
              <button
                onClick={enableSound}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3 bg-primary-600 text-white font-semibold px-6 py-4 rounded-full shadow-lg animate-pulse">
                  <Volume2 size={24} />
                  Click to hear the audio
                </span>
              </button>
            )}
          </div>

          {/* Opt-in modal — appears after 60 seconds of watch time */}
          {showOptin && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <div className="bg-white text-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                {!optinDone ? (
                  <form onSubmit={submitOptin} className="space-y-4">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold">Get Your Free PDF</h2>
                      <p className="text-gray-600">
                        Enter your details and we&apos;ll send you a free guide from
                        Pontotoc Insurance Agency.
                      </p>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      {submitting ? 'Sending...' : 'Send Me the Free PDF'}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle size={24} />
                      <span className="font-semibold">You&apos;re all set!</span>
                    </div>
                    <p className="text-gray-600">
                      Click below to download your free guide.
                    </p>
                    <a
                      href={FREE_PDF_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-secondary-900 hover:bg-secondary-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <FileDown size={20} />
                      Download Free PDF
                    </a>
                    <button
                      onClick={() => setShowOptin(false)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Continue watching
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { AGENCY_PHONE_DISPLAY, AGENCY_PHONE_TEL } from '@/lib/webinar-1'

// The presentation video, served same-origin from public/webinar/. Google
// Drive cannot be used as the source here: it returns 403 to browser video
// fetches (Sec-Fetch-Dest: video), so the file is committed to the repo and
// served by Vercel's CDN instead.
const VIDEO_SRC = '/webinar/presentation-1.mp4'

const FALLBACK_DURATION = 2880 // ~48 min; replaced by the file's real metadata once loaded
const OFFER_AT = 1200 // 20 min in — booking offer reveal

const CALENDAR_URL =
  'https://link.pontotocinsuranceagency.com/widget/bookings/chis-parman-calendar'

function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

const controlButtonClass =
  'flex min-h-[48px] min-w-[48px] items-center justify-center gap-2 rounded-lg bg-white/10 px-3 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-primary-400'

function BookingCalendar() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      <iframe
        src={CALENDAR_URL}
        title="Book a free plan review with Pontotoc Insurance Agency"
        className="block h-[720px] w-full border-0"
      />
    </div>
  )
}

export default function WatchPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const offerPanelRef = useRef<HTMLDivElement>(null)
  const maxProgress = useRef(0)

  const [phase, setPhase] = useState<'idle' | 'started' | 'ended' | 'error'>('idle')
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(FALLBACK_DURATION)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [offerUnlocked, setOfferUnlocked] = useState(false)
  const [offerPanelInView, setOfferPanelInView] = useState(false)

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (!v) return
    if (v.currentTime > maxProgress.current + 1.5) {
      v.currentTime = maxProgress.current // snap back — they tried to skip
    } else {
      maxProgress.current = Math.max(maxProgress.current, v.currentTime)
    }
    setCurrentTime(v.currentTime)
    // Metadata can finish loading before hydration attaches onLoadedMetadata,
    // so keep the duration honest here too (same-value sets are free).
    if (Number.isFinite(v.duration) && v.duration > 0) setDuration(v.duration)
    if (maxProgress.current >= OFFER_AT) setOfferUnlocked(true)
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v || phaseRef.current === 'ended' || phaseRef.current === 'error') return
    if (v.paused) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }

  const start = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    setMuted(false)
    v.play()
      .then(() => setPhase('started'))
      .catch((err: unknown) => {
        // A user-gesture play() that fails because the source is unplayable
        // must not leave a dead overlay button.
        if (err instanceof DOMException && err.name === 'NotSupportedError') {
          setPhase('error')
        }
      })
  }

  const rewind15 = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(0, v.currentTime - 15)
    setCurrentTime(v.currentTime)
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const changeVolume = (value: number) => {
    const v = videoRef.current
    if (!v) return
    v.volume = value
    setVolume(value)
    if (value > 0 && v.muted) {
      v.muted = false
      setMuted(false)
    }
  }

  // Spacebar toggles play/pause once the presentation has started. Buttons and
  // the volume slider keep their native spacebar behavior.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return
      const target = e.target as HTMLElement | null
      if (target && ['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'A'].includes(target.tagName)) return
      if (phaseRef.current !== 'started') return
      e.preventDefault()
      togglePlay()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Sticky bottom bar shows while the unlocked offer panel is off-screen.
  useEffect(() => {
    if (!offerUnlocked || phase === 'ended') return
    const el = offerPanelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      // A sliver of the panel peeking into the viewport should not hide the
      // bar — require a meaningful portion to be visible.
      ([entry]) => setOfferPanelInView(entry.intersectionRatio >= 0.15),
      { threshold: [0, 0.15, 0.5, 1] }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [offerUnlocked, phase])

  const scrollToOffer = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    offerPanelRef.current?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const showStickyBar = offerUnlocked && phase === 'started' && !offerPanelInView
  const progressPercent = Math.min(100, (currentTime / (duration || 1)) * 100)

  return (
    <div>
      {/* Player / end card / error */}
      {phase === 'ended' ? (
        <section aria-label="Presentation finished">
          <div className="rounded-xl bg-secondary-900 p-6 text-white shadow-2xl sm:p-10">
            <h2 className="text-3xl font-bold sm:text-4xl">
              That is the full presentation.
            </h2>
            <p className="mt-4 max-w-3xl text-xl leading-relaxed text-secondary-100">
              You now know more about how Medicare actually works than most
              people ever will. Medicare&rsquo;s Annual Enrollment Period runs
              October 15 through December 7 — if you want help before you
              decide, pick a time below and Chris, our Medicare agent, will
              walk through your plan with you.
            </p>
          </div>
          <div className="mt-8">
            <BookingCalendar />
          </div>
        </section>
      ) : phase === 'error' ? (
        <div
          role="alert"
          className="rounded-xl border-2 border-red-700 bg-red-50 p-6 sm:p-10"
        >
          <p className="text-2xl font-bold text-red-700">
            The video did not load.
          </p>
          <p className="mt-3 text-lg leading-relaxed text-gray-800">
            Refresh the page to try again. If it still does not play, call us at{' '}
            <a
              href={`tel:${AGENCY_PHONE_TEL}`}
              className="inline-block py-1 font-bold text-secondary-800 underline underline-offset-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary-700"
            >
              {AGENCY_PHONE_DISPLAY}
            </a>{' '}
            and we will help another way.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-secondary-900 shadow-2xl">
          <div className="relative">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              preload="metadata"
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate"
              onContextMenu={(e) => e.preventDefault()}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={() => {
                const v = videoRef.current
                if (v && Number.isFinite(v.duration) && v.duration > 0) {
                  setDuration(v.duration)
                }
              }}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPhase('ended')}
              onError={() => setPhase('error')}
              className="block aspect-video w-full bg-black"
            />
            {phase === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-secondary-900/85 px-6 text-center">
                <button
                  type="button"
                  onClick={start}
                  className="flex min-h-[72px] items-center justify-center gap-3 rounded-xl bg-primary-600 px-8 text-2xl font-bold text-white shadow-xl transition-colors hover:bg-primary-700 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
                >
                  <Play aria-hidden="true" size={28} fill="currentColor" />
                  Start the presentation
                </button>
                <p className="text-lg font-semibold text-secondary-100">
                  Sound will be on.
                </p>
              </div>
            )}
          </div>

          {/* Watched progress — display only, not a scrub bar */}
          <div
            role="progressbar"
            aria-label="Presentation progress"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(currentTime)}
            className="h-3 w-full bg-white/20"
          >
            <div
              className="h-full bg-primary-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 px-4 py-3">
            <button
              type="button"
              onClick={togglePlay}
              disabled={phase === 'idle'}
              aria-label={playing ? 'Pause' : 'Play'}
              className={`${controlButtonClass} disabled:opacity-40`}
            >
              {playing ? (
                <Pause aria-hidden="true" size={24} fill="currentColor" />
              ) : (
                <Play aria-hidden="true" size={24} fill="currentColor" />
              )}
            </button>
            <button
              type="button"
              onClick={rewind15}
              disabled={phase === 'idle'}
              aria-label="Go back 15 seconds"
              className={`${controlButtonClass} disabled:opacity-40`}
            >
              <RotateCcw aria-hidden="true" size={22} />
              <span className="text-base font-bold">15s</span>
            </button>
            <span className="text-base font-semibold tabular-nums text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <span className="min-w-2 flex-1" />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
              className={controlButtonClass}
            >
              {muted || volume === 0 ? (
                <VolumeX aria-hidden="true" size={24} />
              ) : (
                <Volume2 aria-hidden="true" size={24} />
              )}
            </button>
            <label className="flex min-h-[48px] items-center gap-2">
              <span className="sr-only">Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
                className="h-2 w-24 cursor-pointer accent-primary-500 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[6px] focus-visible:outline-primary-400"
              />
            </label>
          </div>
        </div>
      )}

      {/* Booking panel — always below the video; OFFER_AT only gates the
          sticky reminder bar */}
      {phase !== 'ended' && (
        <section
          ref={offerPanelRef}
          aria-label="Book a plan review"
          className="mt-10"
        >
          <div className="rounded-xl border-l-4 border-primary-500 bg-primary-50 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-secondary-900">
              Want a second set of eyes on your plan?
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-gray-800">
              Pick a time below for a free plan review with Chris, our Medicare
              agent — about 15 minutes, by phone or at the office in Pontotoc.
              No cost, no pressure, and you keep watching where you left off.
            </p>
          </div>
          <div className="mt-6">
            <BookingCalendar />
          </div>
        </section>
      )}

      {/* Sticky bottom bar while the offer panel is off-screen */}
      {showStickyBar && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t-4 border-primary-500 bg-secondary-900 shadow-2xl">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
            <p className="text-lg font-semibold text-white">
              Ready to talk it through? Book a free plan review with Chris.
            </p>
            <button
              type="button"
              onClick={scrollToOffer}
              className="flex min-h-[56px] items-center justify-center rounded-lg bg-primary-600 px-6 text-xl font-bold text-white transition-colors hover:bg-primary-700 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              See open times
            </button>
          </div>
        </div>
      )}
      {showStickyBar && <div aria-hidden="true" className="h-28" />}
    </div>
  )
}

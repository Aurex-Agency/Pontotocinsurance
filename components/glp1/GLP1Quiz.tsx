'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Phone,
  ChevronLeft,
  CheckCircle,
  ShieldCheck,
  Loader2,
  CalendarDays,
  Download,
} from 'lucide-react'

// -----------------------------------------------------------------------------
// Config. Swap these placeholders for the real values before go-live.
// -----------------------------------------------------------------------------

// Agency phone. tel: link uses the digits only.
const PHONE_DISPLAY = '662-200-2249'
const PHONE_TEL = '+16622002249'

// GoHighLevel booking calendar for this funnel. Override with
// NEXT_PUBLIC_GHL_CALENDAR_URL in the environment if it ever changes.
const CALENDAR_EMBED_URL =
  process.env.NEXT_PUBLIC_GHL_CALENDAR_URL ||
  'https://link.pontotocinsuranceagency.com/widget/bookings/justin-stark'

// Agent shown on the result page. Replace image + name with the real agent.
const AGENT_NAME = 'Justin Stark'
const AGENT_TITLE = 'Licensed Insurance Agent'
const AGENT_PHOTO = '/team/default-avatar.jpg'

// The lead magnet delivered on the result page and in the GHL follow-up email.
// Hosted on our own domain so the download is fast, branded, and reliable.
const CHECKLIST_URL = '/guides/glp1-eligibility-checklist.pdf'

type Answers = Record<string, string>

interface Question {
  id: string
  question: string
  options: string[]
}

const QUESTIONS: Question[] = [
  {
    id: 'enrolled',
    question: 'Are you currently enrolled in Medicare?',
    options: ['Yes', 'No', 'Turning 65 soon'],
  },
  {
    id: 'planType',
    question: 'Do you have a Part D drug plan or a Medicare Advantage plan?',
    options: ['Part D', 'Medicare Advantage', 'Not sure', 'Neither'],
  },
  {
    id: 'heardOfBridge',
    question: 'Have you heard about the new $50 GLP-1 Bridge program?',
    options: ['Yes', 'A little', 'This is new to me'],
  },
  {
    id: 'consideringMed',
    question:
      'Are you or your doctor considering a medication like Wegovy or Zepbound?',
    options: ['Yes', 'Maybe', 'Just curious'],
  },
  {
    id: 'lastReview',
    question:
      'When did you last review your Medicare coverage with a licensed agent?',
    options: ['This year', '1-2 years ago', 'Longer', 'Never'],
  },
  {
    id: 'wantReview',
    question:
      'Would you like a free, no-pressure coverage review with a local agent to see how the new program fits your situation?',
    options: ['Yes', 'Maybe', 'Just send me the info'],
  },
]

// Total steps used for the progress bar: 6 questions + 1 lead capture screen.
const PROGRESS_TOTAL = QUESTIONS.length + 1

// Fire a Meta Pixel event if the pixel has loaded. Safe no-op otherwise.
function firePixel(method: 'track' | 'trackCustom', event: string) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(method, event)
  }
}

// Format a raw phone entry as (123) 456-7890 while the user types.
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  const len = digits.length
  if (len < 4) return digits
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function GLP1Quiz() {
  // step 0 = hook, 1..6 = questions, 7 = lead capture, 8 = result
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [lead, setLead] = useState({ firstName: '', phone: '', email: '' })
  const [errors, setErrors] = useState<{ [k: string]: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  // Scroll to the top of the card on every step change so seniors always start
  // reading from the top of the question.
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'auto', block: 'start' })
    } else if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [step])

  // Fire the custom ScheduleView event once the result page is shown.
  useEffect(() => {
    if (step === 8) {
      firePixel('trackCustom', 'ScheduleView')
    }
  }, [step])

  const goBack = () => setStep((s) => Math.max(0, s - 1))

  const handleAnswer = (question: Question, option: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: option }))
    // Advance to the next screen. One tap, one action.
    setStep((s) => s + 1)
  }

  const validateLead = () => {
    const next: { [k: string]: string } = {}
    if (!lead.firstName.trim()) next.firstName = 'Please enter your first name.'
    const phoneDigits = lead.phone.replace(/\D/g, '')
    if (phoneDigits.length !== 10)
      next.phone = 'Please enter a valid 10-digit phone number.'
    if (!EMAIL_RE.test(lead.email.trim()))
      next.email = 'Please enter a valid email address.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    if (!validateLead()) return

    setSubmitting(true)
    const payload = {
      firstName: lead.firstName.trim(),
      phone: lead.phone.replace(/\D/g, ''),
      phoneFormatted: formatPhone(lead.phone),
      email: lead.email.trim(),
      ...answers,
    }

    try {
      await fetch('/api/glp1-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      // Never block the user from reaching the booking step over a network
      // hiccup. We log and continue.
      console.error('GLP-1 lead submit failed:', err)
    }

    // Fire the Meta Pixel Lead conversion.
    firePixel('track', 'Lead')

    setSubmitting(false)
    setStep(8)
  }

  const isQuestionStep = step >= 1 && step <= QUESTIONS.length
  const showProgress = step >= 1 && step <= PROGRESS_TOTAL // questions + lead
  const progressPct = showProgress
    ? Math.round((Math.min(step, PROGRESS_TOTAL) / PROGRESS_TOTAL) * 100)
    : 0

  return (
    <div className="min-h-screen flex flex-col bg-primary-50 text-secondary-900">
      {/* ---------------------------------------------------------------- */}
      {/* Sticky header with tap-to-call on every screen                    */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 px-4 py-3">
          <Image
            src="/pia_logo.png"
            alt="Pontotoc Insurance Agency"
            width={180}
            height={48}
            className="h-9 sm:h-10 w-auto object-contain"
            priority
          />
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold rounded-lg px-3 sm:px-4 py-2.5 text-base sm:text-lg transition-colors shadow"
            aria-label={`Call us at ${PHONE_DISPLAY}`}
          >
            <Phone size={20} className="shrink-0" />
            <span>{PHONE_DISPLAY}</span>
          </a>
        </div>
        {showProgress && (
          <div className="max-w-3xl mx-auto px-4 pb-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-semibold text-gray-600">
                Step {Math.min(step, PROGRESS_TOTAL)} of {PROGRESS_TOTAL}
              </span>
              <span className="text-sm font-semibold text-gray-600">
                {progressPct}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Main content                                                      */}
      {/* ---------------------------------------------------------------- */}
      <main className="flex-1">
        <div ref={topRef} className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
          {/* Back button on every quiz + lead step */}
          {step >= 1 && step <= PROGRESS_TOTAL && (
            <button
              onClick={goBack}
              className="inline-flex items-center gap-1 text-lg font-semibold text-secondary-700 hover:text-secondary-900 mb-4 py-2 pr-3 -ml-1"
            >
              <ChevronLeft size={24} /> Back
            </button>
          )}

          {/* ---------- Step 0: Hook ---------- */}
          {step === 0 && (
            <div className="text-center pt-4 sm:pt-8">
              <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 text-base font-bold px-4 py-2 rounded-full mb-6">
                <ShieldCheck size={18} /> New for 2026
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5">
                Medicare&apos;s New $50 GLP-1 Program Started July 1. See What It
                Means for Your Coverage.
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 mb-8 leading-relaxed">
                Take this 60-second quiz to get the plain-English facts and find
                out your best next step.
              </p>
              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto sm:px-16 min-h-[64px] bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white text-2xl font-bold rounded-xl transition-colors shadow-lg"
              >
                Start the Quiz
              </button>
              <p className="mt-5 text-lg text-gray-600 font-medium">
                Free. No obligation. From your local Pontotoc agency.
              </p>
            </div>
          )}

          {/* ---------- Steps 1-6: Questions ---------- */}
          {isQuestionStep &&
            (() => {
              const q = QUESTIONS[step - 1]
              const selected = answers[q.id]
              return (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-8">
                    {q.question}
                  </h2>
                  <div className="space-y-4">
                    {q.options.map((option) => {
                      const active = selected === option
                      return (
                        <button
                          key={option}
                          onClick={() => handleAnswer(q, option)}
                          className={`w-full min-h-[64px] px-6 py-4 rounded-xl border-2 text-xl font-semibold text-left transition-all ${
                            active
                              ? 'border-primary-600 bg-primary-100 text-primary-900'
                              : 'border-gray-300 bg-white text-secondary-900 hover:border-primary-500 hover:bg-primary-50 active:bg-primary-100'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })()}

          {/* ---------- Step 7: Lead capture ---------- */}
          {step === 7 && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-3">
                Almost done. Where should we send your 2026 GLP-1 Eligibility
                Checklist?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Enter your details and we will send your checklist. A local agent
                can walk you through it.
              </p>
              <form onSubmit={handleLeadSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-lg font-semibold mb-2"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={lead.firstName}
                    onChange={(e) =>
                      setLead((p) => ({ ...p, firstName: e.target.value }))
                    }
                    className={`w-full min-h-[56px] px-4 text-xl rounded-xl border-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-base text-red-600 font-medium">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-lg font-semibold mb-2"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(662) 200-2249"
                    value={lead.phone}
                    onChange={(e) =>
                      setLead((p) => ({ ...p, phone: formatPhone(e.target.value) }))
                    }
                    className={`w-full min-h-[56px] px-4 text-xl rounded-xl border-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-base text-red-600 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={lead.email}
                    onChange={(e) =>
                      setLead((p) => ({ ...p, email: e.target.value }))
                    }
                    className={`w-full min-h-[56px] px-4 text-xl rounded-xl border-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-base text-red-600 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-[64px] bg-primary-600 hover:bg-primary-700 active:bg-primary-800 disabled:bg-gray-400 text-white text-2xl font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    'Send My Eligibility Checklist'
                  )}
                </button>

                <p className="text-base text-gray-600 leading-relaxed">
                  By submitting, you agree that Pontotoc Insurance Agency may
                  contact you about Medicare insurance options by phone, text, and
                  email. Message and data rates may apply. Consent is not a
                  condition of purchase.
                </p>
              </form>
            </div>
          )}

          {/* ---------- Step 8: Result ---------- */}
          {step === 8 && (
            <div>
              <div className="flex items-center gap-2 text-green-700 mb-4">
                <CheckCircle size={26} />
                <span className="text-xl font-bold">
                  You&apos;re all set{lead.firstName ? `, ${lead.firstName}` : ''}.
                </span>
              </div>

              {/* Instant checklist download */}
              <div className="bg-primary-100 border-2 border-primary-300 rounded-2xl p-5 sm:p-6 mb-8">
                <p className="text-lg font-semibold mb-3">
                  Your 2026 GLP-1 Eligibility Checklist is ready. We also sent a
                  copy to your email.
                </p>
                <a
                  href={CHECKLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => firePixel('trackCustom', 'GuideDownload')}
                  className="w-full min-h-[64px] bg-secondary-900 hover:bg-secondary-800 active:bg-secondary-700 text-white text-xl font-bold rounded-xl transition-colors shadow flex items-center justify-center gap-3"
                >
                  <Download size={24} /> Get the Eligibility Checklist
                </a>
              </div>

              {/* Educational summary */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  About the Medicare GLP-1 Bridge Program
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-gray-800">
                  <p>
                    The GLP-1 Bridge is a Medicare-run demonstration program. It
                    runs from July 1, 2026 through December 31, 2027. For people
                    who qualify, it can set a $50 monthly copay for certain
                    medications like Wegovy, Zepbound KwikPen, and Foundayo.
                  </p>
                  <p>
                    A few plain facts worth knowing. Medicare decides who is
                    eligible, not your Part D plan and not our agency. It is a
                    Medicare demonstration, not a plan benefit you sign up for.
                    And the medication itself is a medical decision, so talk with
                    your doctor about whether one of these medications is right
                    for you.
                  </p>
                  <p className="font-semibold text-secondary-900">
                    Our job is the coverage review. We help you understand your
                    current plan and how this new program may fit your situation.
                  </p>
                </div>
              </div>

              {/* CTA block */}
              <div className="bg-secondary-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 leading-snug">
                  The best next step is a quick call with a local agent to review
                  your 2026 coverage.
                </h2>

                {/* Agent */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary-400/40 shrink-0">
                    <Image
                      src={AGENT_PHOTO}
                      alt={AGENT_NAME}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold">{AGENT_NAME}</div>
                    <div className="text-primary-300 font-medium">
                      {AGENT_TITLE}
                    </div>
                  </div>
                </div>

                {/* Tap to call */}
                <a
                  href={`tel:${PHONE_TEL}`}
                  onClick={() => firePixel('track', 'Contact')}
                  className="w-full min-h-[64px] bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white text-2xl font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-3 mb-6"
                >
                  <Phone size={26} /> Call {PHONE_DISPLAY}
                </a>

                {/* Booking calendar */}
                <div className="bg-white rounded-xl p-2 sm:p-3">
                  <div className="flex items-center justify-center gap-2 text-secondary-800 font-bold text-lg py-3">
                    <CalendarDays size={22} /> Or pick a time that works for you
                  </div>
                  <iframe
                    src={CALENDAR_EMBED_URL}
                    title="Book a call with a local agent"
                    className="w-full rounded-lg"
                    style={{ minHeight: '640px', border: 'none' }}
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* Footer: TPMO disclaimer + affiliation on every screen             */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-3xl mx-auto px-4 py-6 text-sm leading-relaxed text-gray-600 space-y-3">
          <p>
            We do not offer every plan available in your area. Currently we
            represent 9 organizations which offer 47 products in your area.
            Please contact Medicare.gov or 1-800-MEDICARE to get information on
            all of your options.
          </p>
          <p>
            Pontotoc Insurance Agency is a licensed insurance agency and is not
            affiliated with or endorsed by the U.S. government or the federal
            Medicare program. Medicare determines eligibility for the GLP-1
            Bridge program.
          </p>
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Pontotoc Insurance Agency. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

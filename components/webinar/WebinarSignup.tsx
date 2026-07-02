'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  CheckCircle,
  Play,
  Star,
  ShieldCheck,
  AlertTriangle,
  PiggyBank,
  Clock,
  Lock,
} from 'lucide-react'

// Dedicated GoHighLevel inbound webhook for the webinar funnel. The PDF opt-in
// on the watch page posts here too; branch on the `source` field in GHL.
const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/MCFdomwXH4RRN6HkJgry/webhook-trigger/aae78893-8bba-4714-8832-37a509c39af1'

const benefits = [
  'The key Medicare changes coming in 2026, and what they mean for you',
  '7 costly mistakes that could cost you thousands (and how to avoid them)',
  'How to protect your coverage and your retirement savings',
  'Straight answers from licensed Mississippi advisors, no pressure',
]

const discover = [
  {
    icon: ShieldCheck,
    title: "2026 Medicare Changes",
    text: "What's new for premiums, deductibles, and drug coverage this year.",
  },
  {
    icon: AlertTriangle,
    title: 'Avoid Costly Mistakes',
    text: 'The 7 enrollment and coverage traps that quietly drain your wallet.',
  },
  {
    icon: PiggyBank,
    title: 'Protect Your Savings',
    text: 'Keep more of your retirement income with the right coverage strategy.',
  },
  {
    icon: Clock,
    title: 'Watch On Your Time',
    text: 'On-demand and to the point. Watch the moment you register.',
  },
]

const stats = [
  { value: '500+', label: 'Families Helped' },
  { value: '5.0★', label: '75 Google Reviews' },
  { value: '7+', label: 'Years Experience' },
  { value: 'MS', label: 'Locally Licensed' },
]

const team = [
  { name: 'Justin Stark', title: 'Owner & Lead Agent', img: '/team/justin-stark.jpg' },
  { name: 'Brandon Gonzales', title: 'Senior Licensed Agent', img: '/team/brandon-gonzales.jpg' },
  { name: 'Jake Wingo', title: 'Medicare & Annuity Specialist', img: '/team/jake-wingo.jpg' },
]

// Real 5-star Google reviews, pulled from the agency's review feed (authors
// shown by their public initials).
const testimonials = [
  {
    name: 'J.B.',
    location: 'Google review',
    quote:
      'Justin Stark and team were very helpful in finding a health plan to fit my needs. Very knowledgeable guy and easy to talk with. Thanks Justin!!!',
  },
  {
    name: 'B.M.',
    location: 'Google review',
    quote:
      'I was totally impressed with their knowledge. They handled my questions and made phone calls for me. I call that full service!! This was as professional as it gets!',
  },
  {
    name: 'S.W.',
    location: 'Google review',
    quote:
      'My husband and I spent the afternoon with Brandon and he was so patient and knowledgeable. We will definitely turn to him for our healthcare insurance from now on!!',
  },
]

export default function WebinarSignup() {
  const router = useRouter()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [registered, setRegistered] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showStickyCta, setShowStickyCta] = useState(false)
  const formCardRef = useRef<HTMLDivElement>(null)

  // Mobile sticky CTA: appears once the visitor scrolls past the form so the
  // action is never more than one tap away.
  useEffect(() => {
    const el = formCardRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCta(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollToForm = () => {
    formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (registered) {
      router.push('/webinarlink/watch')
      return
    }
    setSubmitting(true)
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          source: 'Webinar: Registration (Medicare 2026)',
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (err) {
      console.error('Webinar registration webhook failed:', err)
    }
    try {
      localStorage.setItem('webinar_lead', JSON.stringify(form))
    } catch {}
    // Give Meta a conversion signal at the actual opt-in moment (the Lead
    // event on the watch page still fires as the primary conversion).
    try {
      if (typeof (window as any).fbq === 'function') {
        ;(window as any).fbq('track', 'CompleteRegistration', {
          content_name: 'Medicare 2026 Webinar',
        })
      }
    } catch {}
    setSubmitting(false)
    setRegistered(true)
  }

  const signupCard = (
    <div ref={formCardRef} id="register" className="bg-white rounded-2xl p-5 sm:p-8 shadow-2xl text-gray-900 scroll-mt-8">
      {!registered ? (
        <>
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold">Watch the Free Training Now</h3>
            <p className="text-sm text-gray-500">
              Just your first name and email. Instant access.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
            >
              {submitting ? 'Saving...' : 'Start Watching Now →'}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <Lock size={12} /> 100% free. No obligation. Instant access.
            </p>
            <p className="flex items-center justify-center gap-1 text-xs text-gray-600 font-medium">
              <Star size={12} fill="currentColor" className="text-primary-500" />
              5.0 rated · 75 Google reviews
            </p>
          </form>
        </>
      ) : (
        <div className="space-y-5 text-center py-2">
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle size={22} />
            <span className="font-semibold">
              You&apos;re registered{form.firstName ? `, ${form.firstName}` : ''}!
            </span>
          </div>
          <button
            onClick={() => router.push('/webinarlink/watch')}
            className="w-full bg-secondary-900 hover:bg-secondary-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg flex items-center justify-center gap-2"
          >
            <Play size={20} fill="currentColor" />
            Watch Webinar
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-white">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-custom flex items-center justify-between py-4">
          <Image
            src="/pia_logo.png"
            alt="Pontotoc Insurance Agency"
            width={170}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 bg-primary-100 px-3 py-1.5 rounded-full">
            <ShieldCheck size={14} /> Licensed in Mississippi
          </span>
        </div>
      </header>

      {/* Hero. Mobile order: headline -> form (above the fold) -> benefits.
          Desktop: headline + benefits left, form right spanning both rows. */}
      <section className="relative bg-gradient-to-br from-secondary-900 to-secondary-700 text-white overflow-hidden">
        <div className="container-custom py-6 sm:py-10 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-x-12 lg:gap-y-8">
            {/* Headline block */}
            <div className="space-y-3 sm:space-y-4 order-1">
              <span className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-200 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-400" />
                </span>
                FREE ON-DEMAND TRAINING · WATCH INSTANTLY
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                How Is Medicare Changing in 2026 and How to Protect Yourself
              </h1>
              <p className="text-base sm:text-lg text-secondary-100">
                A free, plain-English training you can watch right now, on your
                phone. No schedule. No waiting.
              </p>
            </div>

            {/* Signup form: second on mobile (above the fold), right column on desktop */}
            <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 space-y-4">
              {signupCard}
              {/* Host credibility strip */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex -space-x-2.5">
                  {team.map((m) => (
                    <div
                      key={m.name}
                      className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-secondary-800"
                    >
                      <Image src={m.img} alt={m.name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-secondary-200">
                  Hosted by licensed Mississippi advisors
                </span>
              </div>
            </div>

            {/* Benefits: below the form on mobile, under the headline on desktop */}
            <div className="order-3 space-y-4 lg:col-start-1 lg:row-start-2">
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="text-primary-300 shrink-0 mt-0.5" size={20} />
                    <span className="text-secondary-50">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 pt-1">
                <div className="flex text-primary-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-secondary-100">
                  5.0 stars across 75 Google reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-primary-50 border-y border-primary-100">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-primary-600">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll discover */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What You&apos;ll Discover
            </h2>
            <p className="text-gray-600 mt-2">
              A quick, no-fluff training built for Mississippians on (or nearing)
              Medicare.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discover.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                  <Icon className="text-primary-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      {/* TODO: replace with real testimonials */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="text-gray-600 mt-2">
              Families across North Mississippi trust us with their coverage.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="bg-white rounded-2xl p-7 shadow-md flex flex-col"
              >
                <div className="flex text-primary-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-gray-100">
                  <span className="font-semibold text-gray-900">{t.name}</span>
                  <span className="text-gray-500 text-sm block">{t.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Meet Your Licensed Mississippi Team
            </h2>
            <p className="text-gray-600 mt-2">
              Local, licensed advisors who put your interests first.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden shadow-md ring-4 ring-primary-100">
                  <Image src={m.img} alt={m.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold text-gray-900 mt-4">{m.name}</h3>
                <p className="text-sm text-primary-600">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="container-custom py-16 text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold max-w-2xl mx-auto">
            Ready to Protect Your Medicare Coverage in 2026?
          </h2>
          <p className="text-secondary-100 max-w-xl mx-auto">
            Free, on demand, and instant. All it takes is your first name and
            email.
          </p>
          <a
            href="#register"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg shadow-lg"
          >
            <Play size={20} fill="currentColor" /> Get Instant Free Access
          </a>
        </div>
      </section>

      {/* Compliance disclaimers */}
      <footer className="bg-secondary-900 text-secondary-200 text-center text-[13px] leading-relaxed py-8 px-4 space-y-4">
        <p className="max-w-3xl mx-auto font-semibold">
          Pontotoc Insurance Agency · Licensed in Mississippi
        </p>
        <p className="max-w-3xl mx-auto">
          Pontotoc Insurance Agency is not affiliated with or endorsed by the
          federal Medicare program or any government agency.
        </p>
        {/* TPMO disclaimer. TODO: current CMS guidance expects carrier/product
            counts ("we represent X organizations which offer Y products in your
            area"). Get the counts from your FMO/upline and swap this wording. */}
        <p className="max-w-3xl mx-auto">
          We do not offer every plan available in your area. Any information we
          provide is limited to those plans we do offer in your area. Please
          contact Medicare.gov, 1-800-MEDICARE, or your local State Health
          Insurance Program (SHIP) to get information on all of your options.
        </p>
      </footer>

      {/* Sticky mobile CTA: shows after scrolling past the form */}
      {showStickyCta && (
        <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-3">
          <button
            onClick={() =>
              registered ? router.push('/webinarlink/watch') : scrollToForm()
            }
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Play size={18} fill="currentColor" />
            {registered ? 'Watch the Webinar Now' : 'Watch the Free Training'}
          </button>
        </div>
      )}
    </div>
  )
}

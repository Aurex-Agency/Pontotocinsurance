'use client'

import { useEffect, useState } from 'react'
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

// Leads are sent to the same GoHighLevel webhook the homepage form uses.
const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/MCFdomwXH4RRN6HkJgry/webhook-trigger/3433cf41-731f-4a93-9074-2c37e3c9c0a2'

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
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '7+', label: 'Years Experience' },
  { value: 'MS', label: 'Locally Licensed' },
]

const team = [
  { name: 'Justin Stark', title: 'Owner & Lead Agent', img: '/team/justin-stark.jpg' },
  { name: 'Brandon Gonzales', title: 'Senior Licensed Agent', img: '/team/brandon-gonzales.jpg' },
  { name: 'Jake Wingo', title: 'Medicare & Annuity Specialist', img: '/team/jake-wingo.jpg' },
]

export default function WebinarSignup() {
  const router = useRouter()
  const [form, setForm] = useState({ firstName: '', lastName: '' })
  const [registered, setRegistered] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Load the GoHighLevel review widget (real client reviews) for social proof.
  useEffect(() => {
    const src =
      'https://link.pontotocinsuranceagency.com/reputation/assets/review-widget.js'
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

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
    setSubmitting(false)
    setRegistered(true)
  }

  const SignupCard = () => (
    <div id="register" className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900 scroll-mt-8">
      {!registered ? (
        <>
          <div className="text-center mb-5">
            <h3 className="text-xl font-bold">Get Instant Free Access</h3>
            <p className="text-sm text-gray-500">
              Just your name. Start watching in seconds.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
            >
              {submitting ? 'Saving...' : 'Watch the Free Webinar →'}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <Lock size={12} /> 100% free. No obligation. Instant access.
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
      <header className="bg-secondary-900">
        <div className="container-custom flex items-center justify-between py-4">
          <Image
            src="/pia_logo.png"
            alt="Pontotoc Insurance Agency"
            width={170}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary-200 bg-primary-500/15 px-3 py-1.5 rounded-full">
            <ShieldCheck size={14} /> Licensed in Mississippi
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary-900 to-secondary-700 text-white overflow-hidden">
        <div className="container-custom py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-200 text-sm font-semibold px-4 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-400" />
                </span>
                FREE ON-DEMAND WEBINAR
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                How Is Medicare Changing in 2026 and How to Protect Yourself
              </h1>
              <p className="text-lg text-secondary-100">
                A free, plain-English training from Pontotoc Insurance Agency. Learn
                exactly what&apos;s changing and the simple steps to protect your
                coverage and your savings.
              </p>
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
                  Trusted by 500+ families across North Mississippi
                </span>
              </div>
            </div>

            {/* Right: video preview + form */}
            <div className="space-y-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gradient-to-br from-secondary-800 to-secondary-900 border border-white/10">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center shadow-lg">
                    <Play size={34} fill="white" className="text-white ml-1" />
                  </div>
                  <Image
                    src="/pia_logo.png"
                    alt="Pontotoc Insurance Agency"
                    width={180}
                    height={48}
                    className="h-9 w-auto object-contain opacity-90"
                  />
                </div>
                <span className="absolute top-3 left-3 text-[11px] font-bold tracking-wide bg-primary-600 text-white px-2.5 py-1 rounded">
                  ON-DEMAND
                </span>
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-medium bg-black/50 text-white px-2.5 py-1 rounded">
                  <Clock size={12} /> Watch anytime
                </span>
              </div>
              <SignupCard />
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

      {/* Social proof: real client reviews */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom">
          <div className="text-center mb-10">
            <div className="flex justify-center text-primary-500 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="currentColor" />
              ))}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
            <p className="text-gray-600 mt-2">
              Real reviews from families and businesses across North Mississippi.
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <iframe
              className="lc_reviews_widget"
              src="https://link.pontotocinsuranceagency.com/reputation/widgets/review_widget/MCFdomwXH4RRN6HkJgry"
              frameBorder="0"
              scrolling="no"
              style={{ minWidth: '100%', width: '100%', minHeight: '360px' }}
              title="Client Reviews"
            />
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
            Register free and start watching right now. It only takes your name.
          </p>
          <a
            href="#register"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg shadow-lg"
          >
            <Play size={20} fill="currentColor" /> Get Instant Free Access
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="bg-secondary-900 text-secondary-300 text-center text-xs py-6 px-4">
        <p className="max-w-3xl mx-auto">
          Pontotoc Insurance Agency · Licensed in Mississippi. We are not affiliated
          with or endorsed by the U.S. government or the federal Medicare program.
        </p>
      </footer>
    </div>
  )
}

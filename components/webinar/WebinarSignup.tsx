'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Play } from 'lucide-react'

// Leads are sent to the same GoHighLevel webhook the homepage form uses.
const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/MCFdomwXH4RRN6HkJgry/webhook-trigger/3433cf41-731f-4a93-9074-2c37e3c9c0a2'

export default function WebinarSignup() {
  const router = useRouter()
  const [form, setForm] = useState({ firstName: '', lastName: '' })
  const [registered, setRegistered] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Second click: button now reads "Watch Webinar" -> go to the player.
    if (registered) {
      router.push('/webinarlink/watch')
      return
    }

    setSubmitting(true)

    // Register the lead (best-effort — never block access to the webinar).
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          source: 'Webinar: Registration',
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (err) {
      console.error('Webinar registration webhook failed:', err)
    }

    // Persist the name so the webinar page can gate access and attach it to
    // the PDF opt-in later.
    try {
      localStorage.setItem('webinar_lead', JSON.stringify(form))
    } catch {}

    setSubmitting(false)
    setRegistered(true)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-secondary-900 to-secondary-700 text-white flex items-center">
      <div className="container-custom py-16">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <span className="inline-block bg-primary-500/20 text-primary-200 text-sm font-semibold px-4 py-1.5 rounded-full">
              FREE ON-DEMAND WEBINAR
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Watch Our Free Insurance &amp; Retirement Webinar
            </h1>
            <p className="text-lg text-secondary-100">
              Enter your name below to get instant access. No cost, no obligation —
              just expert guidance from Pontotoc Insurance Agency.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl text-left text-gray-900">
            {!registered ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
                >
                  {submitting ? 'Saving...' : 'Get Instant Access →'}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  By registering you agree to receive communications from Pontotoc
                  Insurance Agency.
                </p>
              </form>
            ) : (
              <div className="space-y-5 text-center">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle size={22} />
                  <span className="font-semibold">
                    You&apos;re registered{form.firstName ? `, ${form.firstName}` : ''}!
                  </span>
                </div>
                <button
                  onClick={() => router.push('/webinarlink/watch')}
                  className="w-full bg-secondary-900 hover:bg-secondary-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg flex items-center justify-center gap-2"
                >
                  <Play size={20} fill="currentColor" />
                  Watch Webinar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { CONSENT_TEXT, AGENCY_PHONE_DISPLAY, AGENCY_PHONE_TEL, WEBINAR_SOURCE } from '@/lib/webinar-1'

type FieldName = 'firstName' | 'lastName' | 'email' | 'phone'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function phoneDigits(value: string) {
  const d = value.replace(/\D/g, '')
  return d.length === 11 && d.startsWith('1') ? d.slice(1) : d
}

function validateField(name: FieldName, value: string): string | null {
  const v = value.trim()
  switch (name) {
    case 'firstName':
      return v ? null : 'Please enter your first name.'
    case 'lastName':
      return v ? null : 'Please enter your last name.'
    case 'email':
      if (!v) return 'Please enter your email address.'
      if (!EMAIL_RE.test(v))
        return 'That email looks incomplete. Check it for a typo — it should look like name@example.com.'
      return null
    case 'phone': {
      if (!v) return 'Please enter your phone number.'
      if (phoneDigits(v).length !== 10)
        return 'That number is missing some digits. Please enter all 10, like 662-555-0142.'
      return null
    }
  }
}

const inputClass =
  'block w-full min-h-[56px] rounded-lg border-2 bg-white px-4 text-[1.1875rem] text-secondary-900 placeholder:text-gray-500 ' +
  'focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary-700'

export default function RegistrationCard() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    // Only clear an already-shown error once the field becomes valid. New
    // errors appear on blur, never on keystroke.
    if (errors[name] && !validateField(name, value)) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (name: FieldName) => {
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name]) ?? undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Partial<Record<FieldName, string>> = {}
    for (const name of ['firstName', 'lastName', 'email', 'phone'] as FieldName[]) {
      const err = validateField(name, values[name])
      if (err) nextErrors[name] = err
    }
    setErrors(nextErrors)
    const nextConsentError = consent
      ? null
      : 'Please check the box above so we can send your video link and follow-up.'
    setConsentError(nextConsentError)
    if (Object.keys(nextErrors).length > 0 || nextConsentError) {
      // Defer until React has rendered the data-invalid attributes.
      setTimeout(() => {
        document.querySelector<HTMLElement>('[data-invalid="true"]')?.focus()
      }, 0)
      return
    }

    setSubmitting(true)
    setSubmitError(false)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
        }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.ok && data.redirect) {
        // Meta "Lead" conversion on successful registration. The short delay
        // lets the pixel request leave before the full-page navigation; the
        // watch page's own pixel then fires PageView on arrival.
        const fbq = (window as unknown as { fbq?: Function }).fbq
        if (typeof fbq === 'function') {
          fbq('track', 'Lead', {
            content_name: WEBINAR_SOURCE,
            content_category: 'Webinar',
          })
        }
        setTimeout(() => {
          window.location.assign(data.redirect)
        }, 300)
        return
      }
      setSubmitError(true)
      setSubmitting(false)
    } catch {
      setSubmitError(true)
      setSubmitting(false)
    }
  }

  const fields: Array<{
    name: FieldName
    label: string
    type: string
    autoComplete: string
    inputMode?: 'email' | 'tel'
  }> = [
    { name: 'firstName', label: 'First name', type: 'text', autoComplete: 'given-name' },
    { name: 'lastName', label: 'Last name', type: 'text', autoComplete: 'family-name' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', inputMode: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', inputMode: 'tel' },
  ]

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-2xl" id="register">
      <div className="bg-secondary-900 px-5 py-5 sm:px-7">
        <h2 className="text-[1.5rem] font-bold leading-tight text-white">
          Watch the presentation now
        </h2>
        <p className="mt-1 text-[1.125rem] text-secondary-100">
          Free. It starts the moment you register.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="px-5 py-6 sm:px-7 sm:py-7">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {fields.map((f) => {
            const error = errors[f.name]
            const wide = f.name === 'email' || f.name === 'phone'
            return (
              <div key={f.name} className={wide ? 'sm:col-span-2' : undefined}>
                <label
                  htmlFor={`reg-${f.name}`}
                  className="mb-2 block text-[1.25rem] font-semibold leading-snug text-secondary-900"
                >
                  {f.label}
                </label>
                <input
                  id={`reg-${f.name}`}
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  inputMode={f.inputMode}
                  value={values[f.name]}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  onBlur={() => handleBlur(f.name)}
                  aria-invalid={error ? true : undefined}
                  data-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? `reg-${f.name}-error` : undefined}
                  className={`${inputClass} ${error ? 'border-red-700' : 'border-gray-500'}`}
                />
                {error && (
                  <p
                    id={`reg-${f.name}-error`}
                    className="mt-2 text-[1.0625rem] font-semibold leading-snug text-red-700"
                  >
                    {error}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 rounded-lg border-2 border-gray-400 bg-gray-50 p-4 sm:p-5">
          <label htmlFor="reg-consent" className="flex cursor-pointer items-start gap-4">
            <span className="relative mt-1 flex h-8 w-8 flex-none items-center justify-center">
              <input
                id="reg-consent"
                name="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked)
                  if (e.target.checked) setConsentError(null)
                }}
                aria-invalid={consentError ? true : undefined}
                data-invalid={consentError ? 'true' : undefined}
                aria-describedby={consentError ? 'reg-consent-error' : 'reg-consent-legal'}
                className="peer h-8 w-8 flex-none cursor-pointer appearance-none rounded-md border-2 border-gray-500 bg-white checked:border-secondary-900 checked:bg-secondary-900 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary-700"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="pointer-events-none absolute h-6 w-6 opacity-0 peer-checked:opacity-100"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="square"
              >
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </span>
            <span id="reg-consent-legal" className="text-[1rem] leading-relaxed text-gray-800">
              {CONSENT_TEXT}
            </span>
          </label>
          <p className="mt-3 pl-12 text-[1rem] leading-relaxed text-gray-800">
            See our{' '}
            <a
              href="/privacy"
              className="font-semibold text-secondary-800 underline underline-offset-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary-700"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="/terms"
              className="font-semibold text-secondary-800 underline underline-offset-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary-700"
            >
              Terms
            </a>
            .
          </p>
          {consentError && (
            <p
              id="reg-consent-error"
              className="mt-3 pl-12 text-[1.0625rem] font-semibold leading-snug text-red-700"
            >
              {consentError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 flex min-h-[64px] w-full items-center justify-center gap-3 rounded-lg bg-primary-600 px-6 text-[1.5rem] font-bold text-white shadow-lg transition-colors hover:bg-primary-700 disabled:opacity-80 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-secondary-700"
        >
          {submitting && (
            <span
              aria-hidden="true"
              className="h-5 w-5 flex-none animate-spin rounded-full border-[3px] border-white border-t-transparent motion-reduce:animate-none motion-reduce:border-t-white"
            />
          )}
          {submitting ? 'One moment…' : 'Watch Now'}
        </button>

        <div aria-live="assertive">
          {submitError && (
            <div className="mt-5 rounded-lg border-2 border-red-700 bg-red-50 p-4 sm:p-5">
              <p className="text-[1.125rem] font-bold leading-relaxed text-red-700">
                Something went wrong on our end and your registration did not go
                through.
              </p>
              <p className="mt-2 text-[1.125rem] leading-relaxed text-gray-800">
                Please try again in a minute. Or call us at{' '}
                <a
                  href={`tel:${AGENCY_PHONE_TEL}`}
                  className="inline-block py-1 font-bold text-secondary-800 underline underline-offset-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary-700"
                >
                  {AGENCY_PHONE_DISPLAY}
                </a>{' '}
                and we will set you up over the phone.
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

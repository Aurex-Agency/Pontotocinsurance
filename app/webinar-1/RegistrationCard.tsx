'use client'

import { useState } from 'react'
import { CONSENT_TEXT, AGENCY_PHONE_DISPLAY, AGENCY_PHONE_TEL, WEBINAR_SOURCE } from '@/lib/webinar-1'

type FieldName = 'firstName' | 'email' | 'phone'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function phoneDigits(value: string) {
  const d = value.replace(/\D/g, '')
  return d.length === 11 && d.startsWith('1') ? d.slice(1) : d
}

const inputClass =
  'block w-full min-h-[56px] rounded-lg border-2 bg-white px-4 text-[1.1875rem] text-secondary-900 placeholder:text-gray-500 ' +
  'focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary-700'

const checkboxClass =
  'peer h-8 w-8 flex-none cursor-pointer appearance-none rounded-md border-2 border-gray-500 bg-white checked:border-secondary-900 checked:bg-secondary-900 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-secondary-700'

function CheckMark() {
  return (
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
  )
}

export default function RegistrationCard() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    firstName: '',
    email: '',
    phone: '',
  })
  const [wantsText, setWantsText] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const validateField = (name: FieldName, value: string, textWanted = wantsText): string | null => {
    const v = value.trim()
    switch (name) {
      case 'firstName':
        return v ? null : 'Please enter your first name.'
      case 'email':
        if (!v) return 'Please enter your email address.'
        if (!EMAIL_RE.test(v))
          return 'That email looks incomplete. Check it for a typo. It should look like name@example.com.'
        return null
      case 'phone': {
        if (!textWanted) return null
        if (!v) return 'Please enter your phone number so we can text you the link.'
        if (phoneDigits(v).length !== 10)
          return 'That number is missing some digits. Please enter all 10, like 662-555-0142.'
        return null
      }
    }
  }

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
    for (const name of ['firstName', 'email', 'phone'] as FieldName[]) {
      const err = validateField(name, values[name])
      if (err) nextErrors[name] = err
    }
    setErrors(nextErrors)
    const nextConsentError = consent
      ? null
      : 'Please check the box above so we can send you the class link and follow-up.'
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
      // Ad attribution: forward any UTM/fbclid params on the landing URL so
      // each GHL contact records which ad produced it.
      const params = new URLSearchParams(window.location.search)
      const attribution: Record<string, string> = {}
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']) {
        const value = params.get(key)
        if (value) attribution[key] = value
      }
      const lead = {
        firstName: values.firstName.trim(),
        lastName: '',
        email: values.email.trim(),
        phone: wantsText ? values.phone.trim() : '',
      }
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, ...attribution }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.ok && data.redirect) {
        // Saved so the watch page can prefill the booking calendar without
        // putting PII in the URL. Same-device only, which covers the redirect.
        try {
          localStorage.setItem('webinar1_lead', JSON.stringify(lead))
        } catch {}
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

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-2xl" id="register">
      <div className="bg-secondary-900 px-5 py-5 sm:px-7">
        <h2 className="text-[1.5rem] font-bold leading-tight text-white">
          Watch the free class now
        </h2>
        <p className="mt-1 text-[1.125rem] text-secondary-100">
          It starts the moment you register.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="px-5 py-6 sm:px-7 sm:py-7">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="reg-firstName"
              className="mb-2 block text-[1.25rem] font-semibold leading-snug text-secondary-900"
            >
              First name
            </label>
            <input
              id="reg-firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={values.firstName}
              required
              aria-required="true"
              onChange={(e) => handleChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              aria-invalid={errors.firstName ? true : undefined}
              data-invalid={errors.firstName ? 'true' : undefined}
              aria-describedby={errors.firstName ? 'reg-firstName-error' : undefined}
              className={`${inputClass} ${errors.firstName ? 'border-red-700' : 'border-gray-500'}`}
            />
            {errors.firstName && (
              <p id="reg-firstName-error" className="mt-2 text-[1.0625rem] font-semibold leading-snug text-red-700">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="reg-email"
              className="mb-2 block text-[1.25rem] font-semibold leading-snug text-secondary-900"
            >
              Email
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              required
              aria-required="true"
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              aria-invalid={errors.email ? true : undefined}
              data-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'reg-email-error' : undefined}
              className={`${inputClass} ${errors.email ? 'border-red-700' : 'border-gray-500'}`}
            />
            {errors.email && (
              <p id="reg-email-error" className="mt-2 text-[1.0625rem] font-semibold leading-snug text-red-700">
                {errors.email}
              </p>
            )}
          </div>

          {/* Optional SMS delivery: phone stays hidden until asked for */}
          <div>
            <label htmlFor="reg-wants-text" className="flex cursor-pointer items-center gap-4">
              <span className="relative flex h-8 w-8 flex-none items-center justify-center">
                <input
                  id="reg-wants-text"
                  name="wantsText"
                  type="checkbox"
                  checked={wantsText}
                  onChange={(e) => {
                    setWantsText(e.target.checked)
                    if (!e.target.checked) {
                      setErrors((prev) => ({ ...prev, phone: undefined }))
                    }
                  }}
                  className={checkboxClass}
                />
                <CheckMark />
              </span>
              <span className="text-[1.125rem] leading-relaxed text-gray-800">
                Text me the class link too
              </span>
            </label>
            {wantsText && (
              <div className="mt-4">
                <label
                  htmlFor="reg-phone"
                  className="mb-2 block text-[1.25rem] font-semibold leading-snug text-secondary-900"
                >
                  Phone
                </label>
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  aria-invalid={errors.phone ? true : undefined}
                  data-invalid={errors.phone ? 'true' : undefined}
                  aria-describedby={errors.phone ? 'reg-phone-error' : undefined}
                  className={`${inputClass} ${errors.phone ? 'border-red-700' : 'border-gray-500'}`}
                />
                {errors.phone && (
                  <p id="reg-phone-error" className="mt-2 text-[1.0625rem] font-semibold leading-snug text-red-700">
                    {errors.phone}
                  </p>
                )}
              </div>
            )}
          </div>
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
                className={checkboxClass}
              />
              <CheckMark />
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
            <p id="reg-consent-error" className="mt-3 pl-12 text-[1.0625rem] font-semibold leading-snug text-red-700">
              {consentError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 flex min-h-[64px] w-full items-center justify-center gap-3 rounded-lg bg-primary-600 px-6 text-[1.375rem] font-bold text-white shadow-lg transition-colors hover:bg-primary-700 disabled:opacity-80 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-secondary-700"
        >
          {submitting && (
            <span
              aria-hidden="true"
              className="h-5 w-5 flex-none animate-spin rounded-full border-[3px] border-white border-t-transparent motion-reduce:animate-none motion-reduce:border-t-white"
            />
          )}
          {submitting ? 'One moment…' : 'Watch the Free Medicare Class'}
        </button>
        <p className="mt-3 text-center text-[1.0625rem] font-semibold text-gray-800">
          Free &bull; On-Demand &bull; Watch From Home
        </p>

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

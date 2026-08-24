import type { Metadata } from 'next'
import Image from 'next/image'
import RegistrationCard from './RegistrationCard'
import MetaPixel from '@/components/MetaPixel'
import {
  ACCOMMODATIONS_DISCLAIMER,
  TPMO_DISCLAIMER,
  AGENCY_PHONE_DISPLAY,
  AGENCY_PHONE_TEL,
} from '@/lib/webinar-1'

export const metadata: Metadata = {
  title: 'Free Medicare Presentation for Pontotoc County',
  description:
    'A free 48-minute Medicare presentation with Justin Stark of Pontotoc Insurance Agency. Register and watch immediately. No cost, no obligation.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Free Medicare Presentation for Pontotoc County',
    description:
      'A free 48-minute presentation with Justin Stark of Pontotoc Insurance Agency. Register and watch immediately. No cost, no obligation.',
    url: 'https://pontotocinsuranceagency.com/webinar-1',
    siteName: 'Pontotoc Insurance Agency',
    type: 'website',
    images: [
      { url: '/webinar/vsl-poster.jpg', width: 1280, height: 720, alt: 'Justin Stark presenting Medicare basics' },
    ],
  },
}

const learnBullets = [
  {
    title: 'Will your plan still work in 2027?',
    text: 'How to check whether your current plan will still cover your doctors and your prescriptions in 2027 — and what to do before December 7 if it will not.',
  },
  {
    title: 'Real numbers, side by side',
    text: 'What a Medicare Advantage plan and a Medicare Supplement each actually cost over a full year, so you can compare with real numbers instead of ads.',
  },
  {
    title: 'The 15-minute plan review',
    text: 'The one-page checklist Justin uses to review any Medicare plan in about 15 minutes, so nothing important gets missed.',
  },
]

// Verbatim reviews from the agency's Google Business Profile (via the GHL
// reputation widget). Do not edit the quote text.
const testimonials = [
  {
    quote:
      'After retiring, Justin was very helpful in helping me find the right insurance coverage for me and the most affordable price. I highly recommend him to help you find the best insurance that meets your needs.',
    name: 'Gala Duff',
  },
  {
    quote:
      'Justin Stark and team were very helpful in finding a health plan to fit my needs. Very knowledgeable guy and easy to talk with. Thanks Justin!!!',
    name: 'Jerry Barnes',
  },
  {
    quote:
      'I was totally impressed with their knowledge. They handled my questions and made phone calls for me. I call that full service!! This was as professional as it gets! Thank you for your help and support!',
    name: 'Bernay McGee',
  },
]

const linkClass =
  'font-semibold underline underline-offset-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2'

export default function WebinarLandingPage() {
  return (
    <div className="min-h-screen bg-white text-secondary-900">
      <MetaPixel />

      {/* Top bar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Image
            src="/pia_logo.png"
            alt="Pontotoc Insurance Agency"
            width={170}
            height={48}
            className="h-10 w-auto object-contain sm:h-12"
            priority
          />
          <span className="hidden items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-base font-semibold text-primary-800 sm:inline-flex">
            Licensed in Mississippi
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-12">
            {/* Left: message + VSL */}
            <div>
              <p className="inline-block rounded-full bg-primary-500/20 px-4 py-2 text-base font-bold uppercase tracking-wide text-primary-200">
                Free Medicare presentation
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl xl:text-[3.4rem]">
                Medicare, explained in plain English for Pontotoc County
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-relaxed text-secondary-100">
                A free 48-minute presentation with Justin Stark of Pontotoc
                Insurance Agency. No cost, no obligation, no appointment to
                keep — you watch it right here, right now, as soon as you
                register.
              </p>

              {/* Hero VSL — short preview of the presentation */}
              <div className="mt-8 overflow-hidden rounded-xl border-2 border-secondary-500 bg-secondary-800 shadow-xl">
                <video
                  src="/webinar/vsl-1.mp4"
                  poster="/webinar/vsl-poster.jpg"
                  controls
                  preload="none"
                  playsInline
                  className="block aspect-video w-full bg-black"
                >
                  Your browser cannot play this video.
                </video>
              </div>

              <div className="mt-8 rounded-lg border-l-4 border-primary-500 bg-secondary-800/60 p-5">
                <p className="text-lg font-semibold leading-relaxed text-white">
                  Mark your calendar: Medicare&rsquo;s Annual Enrollment Period
                  runs October 15 through December 7. Decisions you make in that
                  window set your coverage for all of 2027.
                </p>
              </div>
            </div>

            {/* Right: registration card */}
            <div className="lg:sticky lg:top-6">
              <RegistrationCard />
            </div>
          </div>
        </div>
      </section>

      {/* About Justin */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
            Who is teaching this
          </h2>
          <div className="mt-8 flex flex-col items-start gap-8 md:flex-row">
            <Image
              src="/team/justin-stark.jpg"
              alt="Justin Stark, owner of Pontotoc Insurance Agency"
              width={900}
              height={600}
              className="w-full rounded-xl shadow-lg md:w-[340px]"
            />
            <div className="text-lg leading-relaxed text-gray-800">
              <p>
                Justin Stark owns Pontotoc Insurance Agency, an independent
                agency on Highway 15 here in Pontotoc — not a call center in
                another state. He is a licensed Mississippi agent who has helped
                hundreds of families across Pontotoc, Ecru, Tupelo, New Albany,
                and Oxford sort out their Medicare coverage, usually across a
                kitchen table or at the office.
              </p>
              <p className="mt-4">
                When you call the number on this page, someone local answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="bg-primary-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
            What you will walk away knowing
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {learnBullets.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-primary-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-secondary-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-gray-800">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
            From your neighbors
          </h2>
          <p className="mt-3 text-lg text-gray-800">
            Rated 5.0 stars across 75 Google reviews.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <blockquote className="text-lg leading-relaxed text-gray-800">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-lg font-bold text-secondary-900">
                  &mdash; {t.name} &middot;{' '}
                  <span className="font-semibold text-gray-800">
                    Google review
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-200">
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-10 text-base leading-relaxed sm:px-6 lg:px-8">
          <p>{TPMO_DISCLAIMER}</p>
          <p>{ACCOMMODATIONS_DISCLAIMER}</p>
          <p>
            Pontotoc Insurance Agency is a private insurance agency licensed in
            Mississippi. We are not affiliated with or endorsed by the United
            States government or the federal Medicare program.
          </p>
          <p>
            Pontotoc Insurance Agency &middot; 158 MS-15, Suite D, Pontotoc, MS
            38863 &middot;{' '}
            <a
              href={`tel:${AGENCY_PHONE_TEL}`}
              className={`${linkClass} text-white focus-visible:outline-white`}
            >
              {AGENCY_PHONE_DISPLAY}
            </a>
          </p>
          <p>
            <a
              href="/privacy"
              className={`${linkClass} text-white focus-visible:outline-white`}
            >
              Privacy Policy
            </a>{' '}
            &middot;{' '}
            <a
              href="/terms"
              className={`${linkClass} text-white focus-visible:outline-white`}
            >
              Terms
            </a>
          </p>
        </div>
      </footer>

      {/* Mobile-only persistent tap-to-call bar */}
      <div aria-hidden="true" className="h-24 sm:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-primary-500 bg-secondary-900 p-3 sm:hidden">
        <a
          href={`tel:${AGENCY_PHONE_TEL}`}
          className="flex min-h-[56px] items-center justify-center rounded-lg bg-primary-600 text-xl font-bold text-white focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Call us: {AGENCY_PHONE_DISPLAY}
        </a>
      </div>
    </div>
  )
}

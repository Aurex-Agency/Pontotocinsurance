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
  title: 'Free On-Demand Medicare Class for Pontotoc County',
  description:
    'Justin Stark with Pontotoc Insurance Agency explains Medicare in plain English. Free, on-demand, watch from home. No cost, no obligation.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Free On-Demand Medicare Class for Pontotoc County',
    description:
      'Justin Stark with Pontotoc Insurance Agency explains Medicare in plain English. Free, on-demand, watch from home.',
    url: 'https://pontotocinsuranceagency.com/webinar-1',
    siteName: 'Pontotoc Insurance Agency',
    type: 'website',
    images: [
      { url: '/webinar/vsl-poster.jpg', width: 1280, height: 720, alt: 'Justin Stark teaching the free Medicare class' },
    ],
  },
}

const understandItems = [
  'How Original Medicare Parts A and B work',
  'The difference between Medicare Advantage and a Medicare Supplement',
  'What to check about your doctors and networks',
  'How prescription drug coverage fits into the decision',
  'The enrollment windows and timing that matter this fall',
]

const checkupItems = [
  'Doctors',
  'Prescriptions',
  'Current coverage',
  'Potential costs',
  'Questions to consider',
]

// Verbatim reviews from the agency's Google Business Profile (via the GHL
// reputation widget, pulled 2026-08). Do not edit the quote text.
// VERIFY BEFORE LAUNCH: current Google rating and review count (the "5.0
// across 75" line below reflects the widget as of 2026-08).
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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-1 h-6 w-6 flex-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

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
            Pontotoc, Mississippi
          </span>
        </div>
      </header>

      {/* SECTION 1: Hero + registration */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-12">
            <div>
              <p className="inline-block rounded-full bg-primary-500/20 px-4 py-2 text-base font-bold uppercase tracking-wide text-primary-200">
                Free On-Demand Medicare Class
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:mt-5 sm:text-5xl xl:text-[3.4rem]">
                Know What to Check Before Medicare Open Enrollment
              </h1>
              <p className="mt-4 max-w-2xl text-xl leading-relaxed text-secondary-100 sm:mt-5">
                Justin Stark with Pontotoc Insurance Agency explains Medicare in
                plain English so you know what to review about your doctors,
                prescriptions, costs, coverage, and enrollment options.
              </p>
              {/* Mobile-only jump to the form: on phones the registration
                  card sits below the preview video, so the first screen needs
                  its own CTA. Hidden on lg where the card is beside the hero. */}
              <a
                href="#register"
                className="mt-5 flex min-h-[60px] w-full items-center justify-center rounded-lg bg-primary-600 px-6 text-center text-xl font-bold text-white shadow-lg transition-colors hover:bg-primary-700 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white lg:hidden"
              >
                Watch the Free Medicare Class
              </a>
              <p className="mt-3 text-center text-lg font-semibold text-secondary-100 lg:hidden">
                Free &bull; On-Demand &bull; Watch From Home
              </p>

              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-secondary-100 sm:mt-4">
                Watch at your own pace. Pause anytime and come back whenever
                you&rsquo;d like.
              </p>

              {/* Hero preview video */}
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
                  Medicare&rsquo;s Annual Enrollment Period runs October 15
                  through December 7, 2026. Changes made during that window
                  generally apply to your 2027 coverage.
                </p>
              </div>
            </div>

            <div className="lg:sticky lg:top-6">
              <RegistrationCard />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: What you'll understand after watching */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
            What you&rsquo;ll understand after watching
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-gray-800">
            The full class runs about 48 minutes, and you can take it in
            whatever pieces suit you.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {understandItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 text-lg leading-relaxed text-gray-800 shadow-sm"
              >
                <span className="text-primary-700">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 3: Why this matters before open enrollment */}
      <section className="bg-primary-50">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
            Why this matters before open enrollment
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-gray-800">
            <p>
              Between October 15 and December 7 you can make changes to your
              Medicare coverage for 2027. Plans can adjust their costs,
              networks, and drug lists from one year to the next, and doctors
              and pharmacies can move in and out of networks.
            </p>
            <p>
              Reviewing your coverage once a year helps you go into January
              knowing what to expect. Sometimes the right answer is keeping
              exactly what you have. The point is knowing, not changing.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Meet Justin / local trust */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
            Who is teaching this
          </h2>
          <div className="mt-8 flex flex-col items-start gap-8 md:flex-row">
            {/* VERIFY BEFORE LAUNCH: replace with a photo of Justin at the
                office or with a client. The current photo is from an industry
                conference stage and undercuts the local, kitchen-table copy. */}
            <Image
              src="/team/justin-stark.jpg"
              alt="Justin Stark, owner of Pontotoc Insurance Agency"
              width={900}
              height={600}
              sizes="(min-width: 768px) 340px, 100vw"
              className="w-full rounded-xl shadow-lg md:w-[340px]"
            />
            <div className="text-lg leading-relaxed text-gray-800">
              <p>
                Justin Stark owns Pontotoc Insurance Agency, an independent
                agency on Highway 15 here in Pontotoc. He is a licensed
                Mississippi insurance agent serving Pontotoc, Ecru, Tupelo, New
                Albany, Oxford, and the surrounding North Mississippi towns.
              </p>
              <p className="mt-4">
                When you call the number on this page, someone local answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Social proof */}
      <section className="bg-primary-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
            From your neighbors
          </h2>
          {/* VERIFY BEFORE LAUNCH: rating and count sourced from the agency's
              GHL reputation widget 2026-08; confirm current numbers. */}
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

      {/* SECTION 6: The Free 15-Minute Medicare Checkup (secondary to watching) */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
            After the class: the Free 15-Minute Medicare Checkup
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-800">
            After you watch the class, if you&rsquo;d like a second set of
            eyes, our local team can help you review the same areas discussed
            in the class. No cost, no obligation, and no assumption that
            anything needs to change.
          </p>
          <ul className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
            {checkupItems.map((item) => (
              <li key={item} className="flex items-center gap-3 text-lg text-gray-800">
                <span className="text-primary-700">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 7: Final registration CTA */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to make sense of Medicare?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-secondary-100">
            Register with your first name and email. The class starts the
            moment you do.
          </p>
          <a
            href="#register"
            className="mt-8 inline-flex min-h-[64px] items-center justify-center rounded-lg bg-primary-600 px-10 text-[1.375rem] font-bold text-white shadow-lg transition-colors hover:bg-primary-700 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
          >
            Watch the Free Medicare Class
          </a>
          <p className="mt-4 text-lg font-semibold text-secondary-100">
            Free &bull; On-Demand &bull; Watch From Home
          </p>
        </div>
      </section>

      {/* SECTION 8: Compliance disclosures / footer */}
      <footer className="bg-secondary-900 text-secondary-200">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white">Important information</h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed">
            {/* VERIFY BEFORE LAUNCH: organization and product counts in the
                TPMO disclosure (client-provided 2026-08). */}
            <p>{TPMO_DISCLAIMER}</p>
            <p>{ACCOMMODATIONS_DISCLAIMER}</p>
            <p>
              Pontotoc Insurance Agency is a private insurance agency licensed
              in Mississippi. We are not affiliated with or endorsed by the
              United States government or the federal Medicare program.
            </p>
            <p>
              Pontotoc Insurance Agency &middot; 158 MS-15, Suite D, Pontotoc,
              MS 38863 &middot;{' '}
              <a
                href={`tel:${AGENCY_PHONE_TEL}`}
                className={`${linkClass} text-white focus-visible:outline-white`}
              >
                {AGENCY_PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <a href="/privacy" className={`${linkClass} text-white focus-visible:outline-white`}>
                Privacy Policy
              </a>{' '}
              &middot;{' '}
              <a href="/terms" className={`${linkClass} text-white focus-visible:outline-white`}>
                Terms
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile-only persistent tap-to-call bar */}
      <div aria-hidden="true" className="h-24 sm:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-primary-500 bg-secondary-900 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:hidden">
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

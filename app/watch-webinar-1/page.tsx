import type { Metadata } from 'next'
import Image from 'next/image'
import WatchPlayer from './WatchPlayer'
import MetaPixel from '@/components/MetaPixel'
import {
  ACCOMMODATIONS_DISCLAIMER,
  TPMO_DISCLAIMER,
  AGENCY_PHONE_DISPLAY,
  AGENCY_PHONE_TEL,
} from '@/lib/webinar-1'

export const metadata: Metadata = {
  title: 'Your Medicare Class',
  description:
    'Your free Medicare class from Pontotoc Insurance Agency is ready to watch. Watch at your own pace and book a free 15-minute Medicare Checkup when you are ready.',
  robots: { index: false, follow: false },
}

const linkClass =
  'font-semibold underline underline-offset-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2'

export default function WatchWebinarPage() {
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

      {/* Hero strip: short, video stays dominant */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Your Medicare Class
          </h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-secondary-100">
            Justin Stark walks through Medicare in plain English, including
            Original Medicare, Medicare Supplements, Medicare Advantage,
            prescription coverage, and important enrollment considerations.
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-secondary-100">
            Watch at your own pace. Pause anytime and come back when
            you&rsquo;re ready.
          </p>
        </div>
      </section>

      {/* Video + booking card + calendar */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <WatchPlayer />

        {/* Meet the team helping with your review */}
        <section className="mt-14" aria-label="Meet the team">
          <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
            Meet the team helping with your review
          </h2>
          <div className="mt-8 flex flex-col items-start gap-8 md:flex-row">
            <Image
              src="/team/chris-parman.jpg"
              alt="Chris Parman of Pontotoc Insurance Agency"
              width={490}
              height={490}
              sizes="220px"
              className="h-[220px] w-[220px] flex-none rounded-xl object-cover shadow-lg"
            />
            <div className="text-lg leading-relaxed text-gray-800">
              <h3 className="text-2xl font-bold text-secondary-900">
                Chris Parman
              </h3>
              <p className="mt-1 text-lg font-semibold text-primary-800">
                Medicare agent, Pontotoc Insurance Agency
              </p>
              <p className="mt-4">
                Chris works with Justin at Pontotoc Insurance Agency and
                handles the free 15-minute Medicare Checkups. When you book a
                time, Chris is the one who sits down with you, reviews the
                same areas covered in the class, and answers your questions.
              </p>
              <p className="mt-4">
                He is who Justin sends his own family to.
              </p>
            </div>
          </div>
        </section>

        {/* Phone alternative */}
        <div className="mt-10 rounded-xl border border-primary-200 bg-primary-50 p-6">
          <p className="text-lg leading-relaxed text-gray-800">
            Rather talk than book online? Call the office at{' '}
            <a
              href={`tel:${AGENCY_PHONE_TEL}`}
              className={`${linkClass} text-secondary-800 focus-visible:outline-secondary-700`}
            >
              {AGENCY_PHONE_DISPLAY}
            </a>
            . Someone local answers.
          </p>
        </div>

        {/* Second checkup CTA, lower on the page */}
        <section className="mt-14 rounded-xl bg-secondary-900 p-8 text-center text-white sm:p-10">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready for a second set of eyes?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-secondary-100">
            Book a free 15-minute Medicare Checkup with our local team.
          </p>
          <a
            href="#book"
            className="mt-8 inline-flex min-h-[64px] items-center justify-center rounded-lg bg-primary-600 px-10 text-[1.375rem] font-bold text-white shadow-lg transition-colors hover:bg-primary-700 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white"
          >
            Choose a Time
          </a>
          <p className="mt-4 text-lg font-semibold text-secondary-100">
            No cost &bull; No obligation &bull; Local licensed agent
          </p>
        </section>
      </main>

      {/* Compliance disclosures / footer */}
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
          </div>
        </div>
      </footer>
    </div>
  )
}

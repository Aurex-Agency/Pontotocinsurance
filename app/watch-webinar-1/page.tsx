import type { Metadata } from 'next'
import Image from 'next/image'
import MetaPixel from '@/components/MetaPixel'
import {
  TPMO_DISCLAIMER,
  AGENCY_PHONE_DISPLAY,
  AGENCY_PHONE_TEL,
} from '@/lib/webinar-1'

export const metadata: Metadata = {
  title: 'Your Medicare Presentation',
  description:
    'Your free Medicare presentation from Pontotoc Insurance Agency is ready to watch.',
  robots: { index: false, follow: false },
}

const VIDEO_SRC =
  process.env.NEXT_PUBLIC_WEBINAR_VIDEO_URL ||
  'https://hm3ncfw8f6t7bgwn.public.blob.vercel-storage.com/2026-06-15_Episode%201%20%281%29.mp4'

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
            Licensed in Mississippi
          </span>
        </div>
      </header>

      {/* Hero strip */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            You are in. Press play.
          </h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-secondary-100">
            This is the full 48-minute presentation with Justin Stark. Watch it
            straight through, or pause and come back — this page is yours to
            keep. We also sent the link to your email.
          </p>
        </div>
      </section>

      {/* Video */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl bg-secondary-900 shadow-2xl">
          <video
            src={VIDEO_SRC}
            controls
            preload="metadata"
            playsInline
            className="block w-full"
          >
            Your browser cannot play this video. Call us at{' '}
            {AGENCY_PHONE_DISPLAY} and we will help another way.
          </video>
        </div>

        <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-6">
          <p className="text-lg leading-relaxed text-gray-800">
            Have a question while you watch, or want a second set of eyes on
            your current plan? Call the office at{' '}
            <a
              href={`tel:${AGENCY_PHONE_TEL}`}
              className={`${linkClass} text-secondary-800 focus-visible:outline-secondary-700`}
            >
              {AGENCY_PHONE_DISPLAY}
            </a>
            . Someone local answers.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-200">
        <div className="mx-auto max-w-5xl space-y-4 px-4 py-10 text-base leading-relaxed sm:px-6 lg:px-8">
          <p>{TPMO_DISCLAIMER}</p>
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
        </div>
      </footer>
    </div>
  )
}

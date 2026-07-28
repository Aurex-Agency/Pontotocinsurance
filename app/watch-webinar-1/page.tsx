import type { Metadata } from 'next'
import { Archivo, Atkinson_Hyperlegible } from 'next/font/google'
import MetaPixel from '@/components/MetaPixel'
import {
  TPMO_DISCLAIMER,
  AGENCY_PHONE_DISPLAY,
  AGENCY_PHONE_TEL,
} from '@/lib/webinar-1'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-display',
})

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Your Medicare Presentation',
  description:
    'Your free Medicare presentation from Pontotoc Insurance Agency is ready to watch.',
  robots: { index: false, follow: false },
}

const VIDEO_SRC =
  process.env.NEXT_PUBLIC_WEBINAR_VIDEO_URL ||
  'https://hm3ncfw8f6t7bgwn.public.blob.vercel-storage.com/2026-06-15_Episode%201%20%281%29.mp4'

export default function WatchWebinarPage() {
  return (
    <div
      className={`${archivo.variable} ${atkinson.variable} min-h-screen bg-paper font-body text-ink`}
    >
      <MetaPixel />
      <div className="mx-auto max-w-[880px] px-5 pb-16 pt-8 sm:px-8">
        <header>
          <hr className="h-[5px] border-0 bg-ink" aria-hidden="true" />
          <hr className="mt-[6px] h-[2px] border-0 bg-ink" aria-hidden="true" />
          <p className="mt-5 text-[1rem] font-bold uppercase tracking-[0.18em]">
            Pontotoc Insurance Agency &middot; Pontotoc, Mississippi
          </p>
        </header>

        <main className="mt-8">
          <h1 className="font-display text-[2.25rem] font-black leading-[1.05] sm:text-[2.75rem]">
            You are in. Press play.
          </h1>
          <p className="mt-5 text-[1.25rem] leading-relaxed">
            This is the full 48-minute presentation with Justin Stark. Watch it
            straight through, or pause and come back — this page is yours to
            keep. We also sent the link to your email.
          </p>

          <div className="mt-8 border-[3px] border-ink bg-ink">
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

          <div className="mt-8 border-2 border-ink bg-white p-5 sm:p-6">
            <p className="text-[1.125rem] leading-relaxed">
              Have a question while you watch, or want a second set of eyes on
              your current plan? Call the office at{' '}
              <a
                href={`tel:${AGENCY_PHONE_TEL}`}
                className="inline-block py-1 font-bold text-pine underline underline-offset-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-pine"
              >
                {AGENCY_PHONE_DISPLAY}
              </a>
              . Someone local answers.
            </p>
          </div>
        </main>

        <footer className="mt-14">
          <hr className="h-[5px] border-0 bg-ink" aria-hidden="true" />
          <hr className="mt-[6px] h-[2px] border-0 bg-ink" aria-hidden="true" />
          <div className="mt-6 space-y-4 text-[1rem] leading-relaxed">
            <p>{TPMO_DISCLAIMER}</p>
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
                className="inline-block py-1 font-bold text-pine underline underline-offset-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-pine"
              >
                {AGENCY_PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

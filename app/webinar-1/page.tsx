import type { Metadata } from 'next'
import Image from 'next/image'
import { Archivo, Atkinson_Hyperlegible } from 'next/font/google'
import RegistrationCard from './RegistrationCard'
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
  title: 'Free Medicare Presentation for Pontotoc County',
  description:
    'A free 48-minute Medicare presentation with Justin Stark of Pontotoc Insurance Agency. Register and watch immediately. No cost, no obligation.',
  robots: { index: false, follow: false },
}

const learnBullets = [
  'How to check whether your current plan will still cover your doctors and your prescriptions in 2026 — and what to do before December 7 if it will not.',
  'What a Medicare Advantage plan and a Medicare Supplement each actually cost over a full year, side by side, so you can compare with real numbers instead of ads.',
  'The one-page checklist Justin uses to review any Medicare plan in about 15 minutes, so nothing important gets missed.',
]

const testimonials = [
  {
    quote:
      'Justin sat with us until we understood every line of our coverage. Nobody had ever done that for us before.',
    name: 'Linda',
    town: 'Pontotoc',
  },
  {
    quote:
      'I brought him the stack of Medicare mail I had been ignoring all fall. He sorted it out in one afternoon, and my plan costs me less now than it did.',
    name: 'Charles',
    town: 'Ecru',
  },
  {
    quote:
      'He looked at my plan and told me it was fine and not to change a thing. That is when I knew he was honest.',
    name: 'Peggy',
    town: 'Tupelo',
  },
]

function Rule({ thick = false }: { thick?: boolean }) {
  return (
    <hr
      className={`border-0 bg-ink ${thick ? 'h-[5px]' : 'h-[2px]'}`}
      aria-hidden="true"
    />
  )
}

export default function WebinarLandingPage() {
  return (
    <div
      className={`${archivo.variable} ${atkinson.variable} min-h-screen bg-paper font-body text-ink`}
    >
      <MetaPixel />
      <div className="mx-auto max-w-[720px] px-5 pb-16 pt-8 sm:px-8">
        {/* Masthead */}
        <header>
          <Rule thick />
          <div className="mt-[6px]">
            <Rule />
          </div>
          <p className="mt-5 text-[1rem] font-bold uppercase tracking-[0.18em]">
            Pontotoc Insurance Agency &middot; Pontotoc, Mississippi
          </p>
        </header>

        {/* Hero */}
        <section className="mt-8">
          <h1 className="font-display text-[2.5rem] font-black leading-[1.05] sm:text-[3.25rem]">
            Medicare, explained in plain English for Pontotoc County
          </h1>
          <p className="mt-6 text-[1.25rem] leading-relaxed">
            A free 48-minute presentation with Justin Stark of Pontotoc
            Insurance Agency. No cost, no obligation, no appointment to keep —
            you watch it right here, right now, as soon as you register below.
          </p>

          <div className="mt-8">
            <Rule />
            <p className="py-4 text-[1.125rem] font-bold leading-relaxed">
              Mark your calendar: Medicare&rsquo;s Annual Enrollment Period runs
              October 15 through December 7. Decisions you make in that window
              set your coverage for all of 2026.
            </p>
            <Rule />
          </div>
        </section>

        {/* Registration card — the signature element */}
        <section className="mt-10" aria-label="Registration">
          <RegistrationCard />
        </section>

        {/* About Justin */}
        <section className="mt-14">
          <Rule thick />
          <h2 className="mt-6 font-display text-[1.75rem] font-extrabold leading-tight">
            Who is teaching this
          </h2>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            <Image
              src="/team/justin-stark.jpg"
              alt="Justin Stark, owner of Pontotoc Insurance Agency"
              width={900}
              height={600}
              className="h-auto w-full flex-none border-2 border-ink sm:w-[280px]"
            />
            <div className="text-[1.125rem] leading-relaxed">
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
        </section>

        {/* What you'll learn */}
        <section className="mt-14">
          <Rule thick />
          <h2 className="mt-6 font-display text-[1.75rem] font-extrabold leading-tight">
            What you will walk away knowing
          </h2>
          <ul className="mt-6 space-y-5">
            {learnBullets.map((item) => (
              <li key={item} className="flex gap-4 text-[1.125rem] leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-[10px] h-3 w-3 flex-none bg-ink"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Testimonials */}
        <section className="mt-14">
          <Rule thick />
          <h2 className="mt-6 font-display text-[1.75rem] font-extrabold leading-tight">
            From your neighbors
          </h2>
          <div className="mt-6 space-y-8">
            {testimonials.map((t) => (
              <figure key={t.name} className="border-l-4 border-ink pl-5">
                <blockquote className="text-[1.125rem] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-[1.125rem] font-bold">
                  &mdash; {t.name}, {t.town}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14">
          <Rule thick />
          <div className="mt-[6px]">
            <Rule />
          </div>
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
            <p>
              <a
                href="/privacy"
                className="inline-block py-1 font-bold text-pine underline underline-offset-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-pine"
              >
                Privacy Policy
              </a>{' '}
              &middot;{' '}
              <a
                href="/terms"
                className="inline-block py-1 font-bold text-pine underline underline-offset-2 focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-pine"
              >
                Terms
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

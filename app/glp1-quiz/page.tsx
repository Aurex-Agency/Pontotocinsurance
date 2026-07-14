import type { Metadata } from 'next'
import GLP1Quiz from '@/components/glp1/GLP1Quiz'
import MetaPixel from '@/components/MetaPixel'

export const metadata: Metadata = {
  title: "Medicare's New $50 GLP-1 Program for 2026",
  description:
    'See what the new Medicare $50 GLP-1 Bridge program means for your coverage. Take a quick 60-second quiz and get the plain-English facts from your local Pontotoc, MS agency.',
  // Paid ad landing page. Keep it out of the search index, like the other
  // funnel routes on this site.
  robots: { index: false, follow: false },
  alternates: { canonical: '/glp1-quiz' },
}

export default function GLP1QuizPage() {
  return (
    <>
      <MetaPixel />
      <GLP1Quiz />
    </>
  )
}

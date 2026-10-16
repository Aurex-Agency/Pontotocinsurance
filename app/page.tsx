import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import ServicesOverview from '@/components/ServicesOverview'
import WhyChooseUs from '@/components/WhyChooseUs'
import ContactCTA from '@/components/ContactCTA'

export const metadata: Metadata = {
  title: {
    absolute: 'Pontotoc Insurance Agency | Life, Health & Medicare in North Mississippi',
  },
  description: 'Your local insurance agency in Pontotoc, MS. Licensed advisors for life insurance, health insurance, Medicare, and retirement planning serving Tupelo, Oxford, and all of North Mississippi. Get a free quote today.',
  keywords: ['life insurance Pontotoc', 'health insurance Pontotoc', 'Medicare Pontotoc', 'Pontotoc Insurance Agency'],
  openGraph: {
    title: 'Pontotoc Insurance Agency | Life, Health & Medicare in North Mississippi',
    description: 'Your local insurance agency in Pontotoc, MS. Licensed advisors for life, health, Medicare, and retirement planning serving all of North Mississippi.',
    url: 'https://pontotocinsuranceagency.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pontotoc Insurance Agency | Life, Health & Medicare in North Mississippi',
    description: 'Your local insurance agency in Pontotoc, MS. Licensed advisors for life, health, Medicare, and retirement planning serving all of North Mississippi.',
  },
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <section className="container-custom px-4 sm:px-6 py-12"><h2 className="text-3xl font-bold mb-4">Prepare for an insurance conversation</h2><p className="mb-4">Explore life insurance, health coverage and Medicare questions before requesting a quote.</p><a className="text-primary-700 underline" href="/resources">Read our insurance guides</a></section>
      <ContactCTA />
    </>
  )
}

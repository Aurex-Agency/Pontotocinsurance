import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import ServicesOverview from '@/components/ServicesOverview'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import ContactCTA from '@/components/ContactCTA'

export const metadata: Metadata = {
  title: {
    absolute: 'Pontotoc Insurance Agency | Life, Health & Medicare in North Mississippi',
  },
  description: 'Your local insurance agency in Pontotoc, MS. Licensed advisors for life insurance, health insurance, Medicare, and retirement planning serving Tupelo, Oxford, and all of North Mississippi. Get a free quote today.',
  keywords: [
    'financial advisor Pontotoc MS',
    'life insurance advisor Pontotoc Mississippi',
    'health insurance Pontotoc MS',
    'health insurance broker Pontotoc Mississippi',
    'Medicare Pontotoc MS',
    'Medicare advisor Pontotoc Mississippi',
    'annuities Pontotoc MS',
    'annuity advisor Pontotoc Mississippi',
    'retirement planning Pontotoc MS',
    'retirement planning advisor Pontotoc Mississippi',
    'wealth management Pontotoc MS',
    'estate planning Pontotoc Mississippi',
    'high net worth financial advisor Pontotoc',
    'financial planning services Pontotoc MS',
    'investment advisor Pontotoc Mississippi',
    '401k rollover advisor Pontotoc MS',
    'IRA management Pontotoc Mississippi',
    'financial consultant Pontotoc Mississippi',
    'insurance Pontotoc County',
    'Pontotoc insurance agency',
    'financial advisor Tupelo MS',
    'financial advisor Oxford MS'
  ],
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
      <Testimonials />
      <ContactCTA />
    </>
  )
}

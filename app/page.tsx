import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import ServicesOverview from '@/components/ServicesOverview'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import ContactCTA from '@/components/ContactCTA'

export const metadata: Metadata = {
  title: 'Expert Financial Advisors | Life Insurance, Health Insurance & Retirement Planning Mississippi',
  description: 'Premier financial advisors in Pontotoc, MS specializing in life insurance, health insurance, Medicare, and retirement planning. Expert wealth management and estate planning services for high-net-worth individuals and families. Licensed professionals with 7+ years experience.',
  keywords: [
    'financial advisor Mississippi',
    'life insurance advisor Pontotoc',
    'health insurance broker Mississippi',
    'retirement planning advisor',
    'wealth management Mississippi',
    'estate planning Pontotoc',
    'high net worth financial advisor',
    'financial planning services',
    'investment advisor Mississippi',
    'Medicare advisor Pontotoc',
    '401k rollover advisor',
    'IRA management Mississippi',
    'annuity advisor',
    'financial consultant Mississippi'
  ],
  openGraph: {
    title: 'Expert Financial Advisors | Life Insurance, Health Insurance & Retirement Planning Mississippi',
    description: 'Premier financial advisors in Pontotoc, MS specializing in life insurance, health insurance, Medicare, and retirement planning. Expert wealth management services.',
    url: 'https://pontotocinsuranceagency.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Financial Advisors | Life Insurance, Health Insurance & Retirement Planning Mississippi',
    description: 'Premier financial advisors in Pontotoc, MS specializing in life insurance, health insurance, Medicare, and retirement planning.',
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

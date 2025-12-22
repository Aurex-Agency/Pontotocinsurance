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

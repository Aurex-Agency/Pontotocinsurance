import type { Metadata } from 'next'
import HomeInsuranceHero from '@/components/services/HomeInsuranceHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import QuoteForm from '@/components/services/QuoteForm'

export const metadata: Metadata = {
  title: 'Home Insurance Pontotoc MS - Comprehensive Coverage',
  description: 'Expert home insurance in Pontotoc, Mississippi. Dwelling, personal property, liability coverage. Get quotes from multiple carriers. Licensed agents with local expertise.',
  keywords: [
    'home insurance Pontotoc MS',
    'homeowners insurance Mississippi',
    'dwelling insurance Pontotoc',
    'property insurance Mississippi',
    'home insurance quotes Pontotoc',
    'home insurance agent Mississippi',
    'home insurance coverage',
    'home insurance rates Pontotoc',
    'home insurance claims Mississippi'
  ],
  openGraph: {
    title: 'Home Insurance Pontotoc MS - Comprehensive Coverage',
    description: 'Expert home insurance in Pontotoc, Mississippi. Dwelling, personal property, liability coverage. Get quotes from multiple carriers.',
    url: 'https://pontotocinsuranceagency.com/home',
  },
  alternates: {
    canonical: '/home',
  },
}

export default function HomeInsurance() {
  return (
    <>
      <HomeInsuranceHero />
      <CoverageOptions 
        service="home"
        title="Home Insurance Coverage Options"
        description="Protect your home and belongings with comprehensive coverage tailored to your needs."
      />
      <WhyChooseUs 
        service="home"
        title="Why Choose Us for Home Insurance"
        description="Local expertise, competitive rates, and personalized service for all your home insurance needs."
      />
      <QuoteForm 
        service="home"
        title="Get Your Home Insurance Quote"
        description="Get a personalized quote for your home insurance in just minutes."
      />
    </>
  )
}

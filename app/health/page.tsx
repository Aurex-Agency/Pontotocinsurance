import type { Metadata } from 'next'
import HealthInsuranceHero from '@/components/services/HealthInsuranceHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import QuoteForm from '@/components/services/QuoteForm'

export const metadata: Metadata = {
  title: 'Health Insurance Plans & Quotes | Expert Health Insurance Broker Mississippi',
  description: 'Expert health insurance broker in Pontotoc, MS. Find affordable individual, family, and group health insurance plans. HSA options, short-term coverage, and comprehensive marketplace guidance. Licensed health insurance advisors with 7+ years experience.',
  keywords: [
    'health insurance broker Mississippi',
    'health insurance plans Pontotoc',
    'individual health insurance Mississippi',
    'family health insurance plans',
    'health insurance marketplace Mississippi',
    'HSA health insurance Pontotoc',
    'short-term health insurance',
    'group health insurance Mississippi',
    'affordable health insurance Pontotoc',
    'health insurance quotes Mississippi',
    'health insurance advisor',
    'health insurance agent Pontotoc',
    'ACA health insurance Mississippi',
    'health insurance enrollment',
    'health insurance coverage options',
    'health insurance consultant Mississippi',
    'best health insurance plans',
    'health insurance comparison Pontotoc'
  ],
  openGraph: {
    title: 'Health Insurance Plans & Quotes | Expert Health Insurance Broker Mississippi',
    description: 'Expert health insurance broker in Pontotoc, MS. Find affordable individual, family, and group health insurance plans with comprehensive coverage options.',
    url: 'https://pontotocinsuranceagency.com/health',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Insurance Plans & Quotes | Expert Health Insurance Broker Mississippi',
    description: 'Expert health insurance broker in Pontotoc, MS. Find affordable individual, family, and group health insurance plans.',
  },
  alternates: {
    canonical: '/health',
  },
}

export default function HealthInsurance() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Health Insurance Brokerage",
    "provider": {
      "@type": "InsuranceAgency",
      "name": "Pontotoc Insurance Agency",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "158 MS-15, Suite D",
        "addressLocality": "Pontotoc",
        "addressRegion": "MS",
        "postalCode": "38863",
        "addressCountry": "US"
      },
      "telephone": "+1-662-200-2249",
      "email": "info@pontotocinsuranceagency.com"
    },
    "areaServed": {
      "@type": "State",
      "name": "Mississippi"
    },
    "description": "Expert health insurance broker in Pontotoc, MS. Find affordable individual, family, and group health insurance plans with comprehensive coverage options.",
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Health Insurance Plans",
        "description": "Individual, family, and group health insurance plans with HSA options and comprehensive coverage"
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HealthInsuranceHero />
      <CoverageOptions 
        service="health"
        title="Health Insurance Coverage Options"
        description="Navigate the complex world of health insurance with expert guidance and personalized solutions."
      />
      <WhyChooseUs 
        service="health"
        title="Why Choose Us for Health Insurance"
        description="Expert guidance through complex health insurance options with personalized service."
      />
      <QuoteForm 
        service="health"
        title="Get Your Health Insurance Quote"
        description="Get a personalized quote for your health insurance in just minutes."
      />
    </>
  )
}

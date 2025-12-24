import type { Metadata } from 'next'
import HealthInsuranceHero from '@/components/services/HealthInsuranceHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import QuoteForm from '@/components/services/QuoteForm'

export const metadata: Metadata = {
  title: 'Health Insurance Pontotoc MS | Health Insurance Broker Pontotoc Mississippi',
  description: 'Expert health insurance broker in Pontotoc, MS. Find affordable individual, family, and group health insurance plans. HSA options, short-term coverage, and comprehensive marketplace guidance. Licensed health insurance advisors serving Pontotoc, Tupelo, Oxford, and all of Mississippi. Free health insurance quotes in Pontotoc County.',
  keywords: [
    'health insurance Pontotoc MS',
    'health insurance broker Pontotoc Mississippi',
    'health insurance plans Pontotoc MS',
    'health insurance agent Pontotoc MS',
    'health insurance advisor Pontotoc Mississippi',
    'individual health insurance Pontotoc MS',
    'family health insurance Pontotoc Mississippi',
    'health insurance marketplace Pontotoc MS',
    'HSA health insurance Pontotoc MS',
    'short-term health insurance Pontotoc',
    'group health insurance Pontotoc Mississippi',
    'affordable health insurance Pontotoc MS',
    'health insurance quotes Pontotoc Mississippi',
    'ACA health insurance Pontotoc MS',
    'health insurance enrollment Pontotoc',
    'health insurance coverage Pontotoc MS',
    'health insurance consultant Pontotoc Mississippi',
    'best health insurance plans Pontotoc MS',
    'health insurance comparison Pontotoc Mississippi',
    'health insurance Pontotoc County',
    'health insurance Tupelo MS',
    'health insurance Oxford MS'
  ],
  openGraph: {
    title: 'Health Insurance Pontotoc MS | Health Insurance Broker Pontotoc Mississippi',
    description: 'Expert health insurance broker in Pontotoc, MS. Find affordable individual, family, and group health insurance plans. Serving Pontotoc, Tupelo, Oxford, and all of Mississippi.',
    url: 'https://www.pontotocinsuranceagency.com/health',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Insurance Pontotoc MS | Health Insurance Broker Pontotoc Mississippi',
    description: 'Expert health insurance broker in Pontotoc, MS. Find affordable individual, family, and group health insurance plans. Serving Pontotoc County and all of Mississippi.',
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
    "areaServed": [
      {
        "@type": "City",
        "name": "Pontotoc",
        "containedInPlace": {
          "@type": "State",
          "name": "Mississippi"
        }
      },
      {
        "@type": "City",
        "name": "Tupelo",
        "containedInPlace": {
          "@type": "State",
          "name": "Mississippi"
        }
      },
      {
        "@type": "City",
        "name": "Oxford",
        "containedInPlace": {
          "@type": "State",
          "name": "Mississippi"
        }
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.2479",
      "longitude": "-89.0067"
    },
    "description": "Expert health insurance broker in Pontotoc, MS. Find affordable individual, family, and group health insurance plans. Serving Pontotoc, Tupelo, Oxford, and all of Mississippi with comprehensive coverage options.",
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

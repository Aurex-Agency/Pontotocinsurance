import type { Metadata } from 'next'
import RetirementPlanningHero from '@/components/services/RetirementPlanningHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import LeadMagnetSection from '@/components/retirement/LeadMagnetSection'
import QuoteForm from '@/components/services/QuoteForm'

export const metadata: Metadata = {
  title: 'Annuities Pontotoc MS | Retirement Planning & Annuity Advisor Pontotoc Mississippi',
  description: 'Expert annuity advisor and retirement planning specialist in Pontotoc, MS. Comprehensive annuities, 401(k) rollovers, IRA management, and wealth management services. Licensed financial advisors serving Pontotoc, Tupelo, Oxford, and all of Mississippi. Free annuity consultation in Pontotoc County.',
  keywords: [
    'annuities Pontotoc MS',
    'annuity advisor Pontotoc Mississippi',
    'annuity Pontotoc MS',
    'annuity agent Pontotoc MS',
    'annuity plans Pontotoc Mississippi',
    'fixed annuity Pontotoc MS',
    'variable annuity Pontotoc Mississippi',
    'immediate annuity Pontotoc MS',
    'deferred annuity Pontotoc MS',
    'annuity rates Pontotoc Mississippi',
    'annuity quotes Pontotoc MS',
    'best annuities Pontotoc MS',
    'annuity comparison Pontotoc Mississippi',
    'retirement planning Pontotoc MS',
    'retirement planning advisor Pontotoc Mississippi',
    '401k rollover advisor Pontotoc MS',
    'IRA management Pontotoc Mississippi',
    'retirement planning services Pontotoc MS',
    'wealth management advisor Pontotoc Mississippi',
    'retirement advisor Pontotoc MS',
    '401k rollover services Pontotoc',
    'IRA rollover advisor Pontotoc MS',
    'Social Security optimization Pontotoc',
    'retirement planning consultant Pontotoc Mississippi',
    'financial planning services Pontotoc MS',
    'retirement investment strategies Pontotoc',
    'retirement savings advisor Pontotoc MS',
    'pension planning Pontotoc Mississippi',
    'retirement income planning Pontotoc MS',
    'annuity Pontotoc County',
    'annuities Tupelo MS',
    'annuities Oxford MS'
  ],
  openGraph: {
    title: 'Annuities Pontotoc MS | Retirement Planning & Annuity Advisor Pontotoc Mississippi',
    description: 'Expert annuity advisor and retirement planning specialist in Pontotoc, MS. Comprehensive annuities, 401(k) rollovers, IRA management, and wealth management services. Serving Pontotoc, Tupelo, Oxford, and all of Mississippi.',
    url: 'https://www.pontotocinsuranceagency.com/retirement',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annuities Pontotoc MS | Retirement Planning & Annuity Advisor Pontotoc Mississippi',
    description: 'Expert annuity advisor and retirement planning specialist in Pontotoc, MS. Comprehensive annuities, 401(k) rollovers, and IRA management. Serving Pontotoc County and all of Mississippi.',
  },
  alternates: {
    canonical: '/retirement',
  },
}

export default function RetirementPlanning() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Financial Planning",
    "provider": {
      "@type": "FinancialService",
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
    "description": "Expert annuity advisor and retirement planning specialist in Pontotoc, MS. Comprehensive annuities, 401(k) rollovers, IRA management, and wealth management services. Serving Pontotoc, Tupelo, Oxford, and all of Mississippi.",
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Annuities and Retirement Planning",
        "description": "Comprehensive annuities, retirement planning, 401(k) rollovers, IRA management, Social Security optimization, and investment strategies for residents of Pontotoc, MS and surrounding areas"
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RetirementPlanningHero />
      <CoverageOptions 
        service="retirement"
        title="Retirement Planning Services"
        description="Build a secure retirement with comprehensive planning services and investment strategies."
      />
      <WhyChooseUs 
        service="retirement"
        title="Why Choose Us for Retirement Planning"
        description="Expert financial guidance and personalized retirement strategies for your future."
      />
      <LeadMagnetSection />
      <QuoteForm 
        service="retirement"
        title="Start Your Retirement Planning"
        description="Get started with your retirement planning consultation today."
      />
    </>
  )
}

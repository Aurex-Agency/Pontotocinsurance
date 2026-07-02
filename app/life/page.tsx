import type { Metadata } from 'next'
import LifeInsuranceHero from '@/components/services/LifeInsuranceHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import QuoteForm from '@/components/services/QuoteForm'

export const metadata: Metadata = {
  title: 'Life Insurance in Pontotoc, MS | Term, Whole & Universal',
  description: 'Compare term, whole, and universal life insurance with a licensed local advisor in Pontotoc, MS. Protect your family across North Mississippi with the right policy at the right price. Free quotes: (662) 200-2249.',
  keywords: [
    'life insurance advisor Mississippi',
    'term life insurance Pontotoc',
    'whole life insurance Mississippi',
    'universal life insurance',
    'life insurance quotes Mississippi',
    'life insurance broker Pontotoc',
    'estate planning life insurance',
    'high net worth life insurance',
    'life insurance for families',
    'life insurance agent Mississippi',
    'permanent life insurance',
    'life insurance coverage Pontotoc',
    'life insurance policy Mississippi',
    'life insurance comparison',
    'affordable life insurance Pontotoc',
    'life insurance for estate planning',
    'wealth transfer life insurance',
    'life insurance consultation Mississippi',
    'best life insurance companies',
    'life insurance rates Pontotoc'
  ],
  openGraph: {
    title: 'Life Insurance in Pontotoc, MS | Term, Whole & Universal',
    description: 'Compare term, whole, and universal life insurance with a licensed local advisor in Pontotoc, MS. Serving families across North Mississippi.',
    url: 'https://pontotocinsuranceagency.com/life',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Insurance in Pontotoc, MS | Term, Whole & Universal',
    description: 'Compare term, whole, and universal life insurance with a licensed local advisor in Pontotoc, MS. Serving families across North Mississippi.',
  },
  alternates: {
    canonical: '/life',
  },
}

export default function LifeInsurance() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Life Insurance Advisory",
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
    "description": "Expert life insurance advisor in Pontotoc, MS specializing in term, whole, and universal life insurance. Estate planning and wealth transfer strategies for high-net-worth individuals.",
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Life Insurance",
        "description": "Term, whole, and universal life insurance policies with estate planning and wealth transfer strategies"
      }
    }
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pontotocinsuranceagency.com" },
      { "@type": "ListItem", "position": 2, "name": "Life Insurance", "item": "https://pontotocinsuranceagency.com/life" }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, breadcrumbData]) }}
      />
      <LifeInsuranceHero />
      <CoverageOptions 
        service="life"
        title="Life Insurance Coverage Options"
        description="Secure your family's future with life insurance plans that provide financial protection when they need it most."
      />
      <WhyChooseUs 
        service="life"
        title="Why Choose Us for Life Insurance"
        description="Expert guidance, competitive rates, and personalized service for all your life insurance needs."
      />
      <QuoteForm 
        service="life"
        title="Get Your Life Insurance Quote"
        description="Get a personalized quote for your life insurance in just minutes."
      />
    </>
  )
}

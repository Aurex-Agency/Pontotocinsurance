import type { Metadata } from 'next'
import RetirementPlanningHero from '@/components/services/RetirementPlanningHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import QuoteForm from '@/components/services/QuoteForm'

export const metadata: Metadata = {
  title: 'Retirement Planning Advisor | 401k Rollover, IRA & Wealth Management Mississippi',
  description: 'Expert retirement planning advisor in Pontotoc, MS. Comprehensive wealth management services including 401(k) rollovers, IRA management, annuities, Social Security optimization, and investment strategies. Licensed financial advisors helping high-net-worth individuals build secure retirement portfolios.',
  keywords: [
    'retirement planning advisor Mississippi',
    '401k rollover advisor Pontotoc',
    'IRA management Mississippi',
    'retirement planning services',
    'wealth management advisor Mississippi',
    'retirement advisor Pontotoc',
    '401k rollover services',
    'IRA rollover advisor Mississippi',
    'annuity advisor Pontotoc',
    'Social Security optimization',
    'retirement planning consultant Mississippi',
    'financial planning services',
    'retirement investment strategies',
    'retirement savings advisor Pontotoc',
    'pension planning Mississippi',
    'retirement income planning',
    'high net worth retirement planning',
    'retirement portfolio management',
    'retirement planning for professionals',
    'comprehensive retirement planning Mississippi'
  ],
  openGraph: {
    title: 'Retirement Planning Advisor | 401k Rollover, IRA & Wealth Management Mississippi',
    description: 'Expert retirement planning advisor in Pontotoc, MS. Comprehensive wealth management services including 401(k) rollovers, IRA management, annuities, and investment strategies.',
    url: 'https://pontotocinsuranceagency.com/retirement',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Planning Advisor | 401k Rollover, IRA & Wealth Management Mississippi',
    description: 'Expert retirement planning advisor in Pontotoc, MS. Comprehensive wealth management services including 401(k) rollovers, IRA management, and investment strategies.',
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
    "areaServed": {
      "@type": "State",
      "name": "Mississippi"
    },
    "description": "Expert retirement planning advisor in Pontotoc, MS. Comprehensive wealth management services including 401(k) rollovers, IRA management, annuities, and investment strategies.",
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Retirement Planning",
        "description": "Comprehensive retirement planning including 401(k) rollovers, IRA management, annuities, Social Security optimization, and investment strategies"
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
      <QuoteForm 
        service="retirement"
        title="Start Your Retirement Planning"
        description="Get started with your retirement planning consultation today."
      />
    </>
  )
}

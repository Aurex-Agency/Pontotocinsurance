import React from 'react';
import type { Metadata } from 'next';
import MedicareHero from '@/components/services/MedicareHero';
import CoverageOptions from '@/components/services/CoverageOptions';
import WhyChooseUs from '@/components/services/WhyChooseUs';
import QuoteForm from '@/components/services/QuoteForm';
import MedicareAdvantage from '@/components/medicare/MedicareAdvantage';
import MedicareSupplement from '@/components/medicare/MedicareSupplement';
import PrescriptionDrugPlans from '@/components/medicare/PrescriptionDrugPlans';
import MedicareEligibility from '@/components/medicare/MedicareEligibility';
import MedicareCosts from '@/components/medicare/MedicareCosts';
import MedicareEnrollment from '@/components/medicare/MedicareEnrollment';
import MedicareFAQ from '@/components/medicare/MedicareFAQ';

export const metadata: Metadata = {
  title: 'Medicare Insurance Plans Pontotoc MS | Medicare Advisor Pontotoc Mississippi',
  description: 'Expert Medicare insurance advisor in Pontotoc, MS. Medicare Advantage, Medigap, Part D plans. Licensed Medicare agents serving Pontotoc, Tupelo, Oxford, and all of Mississippi. Free Medicare consultation. Compare Medicare plans in Pontotoc County.',
  keywords: [
    'Medicare Pontotoc MS',
    'Medicare insurance Pontotoc MS',
    'Medicare advisor Pontotoc Mississippi',
    'Medicare agent Pontotoc MS',
    'Medicare Advantage plans Pontotoc MS',
    'Medigap insurance Pontotoc Mississippi',
    'Medicare Part D plans Pontotoc',
    'Medicare supplement Pontotoc MS',
    'Medicare enrollment Pontotoc Mississippi',
    'Medicare broker Pontotoc MS',
    'senior insurance Pontotoc MS',
    'Medicare costs Pontotoc Mississippi',
    'Medicare eligibility Pontotoc MS',
    'Medicare plans Pontotoc County',
    'best Medicare plans Pontotoc MS',
    'Medicare comparison Pontotoc Mississippi',
    'Medicare Part C Pontotoc',
    'Medicare Advantage Pontotoc MS',
    'Medicare coverage Pontotoc Mississippi',
    'Medicare quotes Pontotoc MS'
  ],
  openGraph: {
    title: 'Medicare Insurance Plans Pontotoc MS | Medicare Advisor Pontotoc Mississippi',
    description: 'Expert Medicare insurance advisor in Pontotoc, MS. Medicare Advantage, Medigap, Part D plans. Licensed Medicare agents serving Pontotoc, Tupelo, Oxford, and all of Mississippi.',
    url: 'https://pontotocinsuranceagency.com/medicare',
    type: 'website',
  },
  alternates: {
    canonical: '/medicare',
  },
}

export default function MedicarePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Medicare Insurance Advisory",
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
      "email": "info@pontotocinsuranceagency.com",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "34.2479",
        "longitude": "-89.0067"
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
      ]
    },
    "description": "Expert Medicare insurance advisor in Pontotoc, MS. Medicare Advantage, Medigap, Part D plans. Licensed Medicare agents serving Pontotoc, Tupelo, Oxford, and all of Mississippi.",
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Medicare Insurance Plans",
        "description": "Medicare Advantage, Medigap, and Prescription Drug Plans for seniors in Pontotoc, MS and surrounding areas"
      }
    }
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MedicareHero />
      
      <MedicareEligibility />
      
      <MedicareAdvantage />
      
      <MedicareSupplement />
      
      <PrescriptionDrugPlans />
      
      <MedicareCosts />
      
      <MedicareEnrollment />
      
      <CoverageOptions 
        service="medicare"
        title="Medicare Coverage Options"
        description="Comprehensive Medicare coverage including Parts A, B, C, D, and Medigap plans for seniors."
      />
      
      <WhyChooseUs 
        service="medicare"
        title="Why Choose Pontotoc Insurance Agency for Medicare?"
        description="Our Medicare experts help you navigate the complex world of Medicare coverage with personalized guidance and ongoing support."
      />
      
      <MedicareFAQ />
      
      <QuoteForm 
        service="medicare"
        title="Get Your Medicare Quote Today"
        description="Let us help you find the right Medicare plan for your needs and budget."
      />
    </div>
  );
}

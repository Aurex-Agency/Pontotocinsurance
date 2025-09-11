import React from 'react';
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

export default function MedicarePage() {
  return (
    <div className="min-h-screen">
      <MedicareHero />
      
      <MedicareEligibility />
      
      <MedicareAdvantage />
      
      <MedicareSupplement />
      
      <PrescriptionDrugPlans />
      
      <MedicareCosts />
      
      <MedicareEnrollment />
      
      <CoverageOptions 
        title="Medicare Coverage Options"
        options={[
          {
            title: "Original Medicare (Parts A & B)",
            description: "Hospital insurance and medical insurance coverage",
            features: ["Hospital stays", "Doctor visits", "Outpatient care", "Preventive services"]
          },
          {
            title: "Medicare Advantage (Part C)",
            description: "All-in-one alternative to Original Medicare",
            features: ["All Original Medicare benefits", "Additional benefits", "Prescription drug coverage", "Vision and dental"]
          },
          {
            title: "Medicare Supplement (Medigap)",
            description: "Additional coverage for Original Medicare",
            features: ["Out-of-pocket costs", "Deductibles and coinsurance", "Foreign travel emergency", "Excess charges"]
          },
          {
            title: "Prescription Drug Plans (Part D)",
            description: "Standalone prescription drug coverage",
            features: ["Generic and brand-name drugs", "Mail-order pharmacy", "Preferred pharmacy networks", "Catastrophic coverage"]
          }
        ]}
      />
      
      <WhyChooseUs 
        title="Why Choose Pontotoc Insurance Agency for Medicare?"
        reasons={[
          {
            title: "Medicare Expertise",
            description: "Our agents are certified and trained in all aspects of Medicare coverage and enrollment."
          },
          {
            title: "Personalized Guidance",
            description: "We help you understand your options and choose the plan that best fits your needs and budget."
          },
          {
            title: "Annual Reviews",
            description: "We review your coverage annually to ensure you're getting the best value and coverage."
          },
          {
            title: "Claims Support",
            description: "We assist with claims issues and help resolve any problems with your Medicare coverage."
          }
        ]}
      />
      
      <MedicareFAQ />
      
      <QuoteForm 
        service="Medicare"
        title="Get Your Medicare Quote Today"
        description="Let us help you find the right Medicare plan for your needs and budget."
      />
    </div>
  );
}

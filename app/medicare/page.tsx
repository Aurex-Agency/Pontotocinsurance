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

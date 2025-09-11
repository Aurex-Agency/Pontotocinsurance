import HealthInsuranceHero from '@/components/services/HealthInsuranceHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import QuoteForm from '@/components/services/QuoteForm'

export default function HealthInsurance() {
  return (
    <>
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

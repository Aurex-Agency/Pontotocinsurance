import AutoInsuranceHero from '@/components/services/AutoInsuranceHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import QuoteForm from '@/components/services/QuoteForm'

export default function AutoInsurance() {
  return (
    <>
      <AutoInsuranceHero />
      <CoverageOptions 
        service="auto"
        title="Auto Insurance Coverage Options"
        description="Get the right coverage for your vehicle with competitive rates and comprehensive protection."
      />
      <WhyChooseUs 
        service="auto"
        title="Why Choose Us for Auto Insurance"
        description="Local expertise, multiple carrier options, and personalized service for all your auto insurance needs."
      />
      <QuoteForm 
        service="auto"
        title="Get Your Auto Insurance Quote"
        description="Get a personalized quote for your auto insurance in just minutes."
      />
    </>
  )
}

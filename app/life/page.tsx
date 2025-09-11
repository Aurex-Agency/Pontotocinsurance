import LifeInsuranceHero from '@/components/services/LifeInsuranceHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import QuoteForm from '@/components/services/QuoteForm'

export default function LifeInsurance() {
  return (
    <>
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

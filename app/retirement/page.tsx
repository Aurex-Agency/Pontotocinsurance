import RetirementPlanningHero from '@/components/services/RetirementPlanningHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import QuoteForm from '@/components/services/QuoteForm'

export default function RetirementPlanning() {
  return (
    <>
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

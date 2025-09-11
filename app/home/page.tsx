import HomeInsuranceHero from '@/components/services/HomeInsuranceHero'
import CoverageOptions from '@/components/services/CoverageOptions'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import QuoteForm from '@/components/services/QuoteForm'

export default function HomeInsurance() {
  return (
    <>
      <HomeInsuranceHero />
      <CoverageOptions 
        service="home"
        title="Home Insurance Coverage Options"
        description="Protect your home and belongings with comprehensive coverage tailored to your needs."
      />
      <WhyChooseUs 
        service="home"
        title="Why Choose Us for Home Insurance"
        description="Local expertise, competitive rates, and personalized service for all your home insurance needs."
      />
      <QuoteForm 
        service="home"
        title="Get Your Home Insurance Quote"
        description="Get a personalized quote for your home insurance in just minutes."
      />
    </>
  )
}

import { Metadata } from 'next'
import TeamHero from '@/components/team/TeamHero'
import StaticTeamGrid from '@/components/team/StaticTeamGrid'
import TeamStats from '@/components/team/TeamStats'

export const metadata: Metadata = {
  title: 'Our Team - Expert Insurance Professionals',
  description: 'Meet our experienced team of insurance professionals at Pontotoc Insurance Agency. Licensed agents with 5+ years of experience dedicated to finding the best coverage for you.',
  keywords: [
    'insurance team Pontotoc',
    'insurance agents Mississippi',
    'licensed insurance professionals',
    'insurance experts Pontotoc',
    'local insurance team',
    'insurance specialists Mississippi'
  ],
  openGraph: {
    title: 'Our Team - Expert Insurance Professionals',
    description: 'Meet our experienced team of insurance professionals at Pontotoc Insurance Agency. Licensed agents with 5+ years of experience dedicated to finding the best coverage for you.',
    images: ['/pia_logo.png'],
  },
}

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      <TeamHero />
      <TeamStats />
      <StaticTeamGrid />
    </div>
  )
}

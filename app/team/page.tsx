import { Metadata } from 'next'
import TeamHero from '@/components/team/TeamHero'
import TeamGrid from '@/components/team/TeamGrid'
import TeamStats from '@/components/team/TeamStats'
import { getTeamMembers } from '@/lib/database'

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

// Helper function to convert database team member to frontend format
function convertTeamMemberToFrontend(dbMember: any) {
  return {
    id: dbMember.id,
    name: dbMember.name,
    title: dbMember.title,
    bio: dbMember.bio,
    image: dbMember.image_url || '/team/default-avatar.jpg',
    email: dbMember.email || '',
    phone: dbMember.phone || '',
    specialties: dbMember.specialties || [],
    licenses: dbMember.licenses || [],
    yearsExperience: dbMember.years_experience || 0,
    displayOrder: dbMember.display_order || 1,
    isActive: dbMember.is_active,
    socialMedia: dbMember.social_media || {}
  }
}

export default async function TeamPage() {
  // Fetch team data on the server for instant loading
  const result = await getTeamMembers()
  
  // Convert database format to frontend format
  const teamMembers = result.success && result.data 
    ? result.data.map(convertTeamMemberToFrontend)
    : []
  
  const teamData = {
    teamMembers,
    settings: {
      showSocialMedia: true,
      showContactInfo: true,
      showSpecialties: true,
      showExperience: true,
      gridColumns: 3,
      enableDragDrop: true
    }
  }

  return (
    <div className="min-h-screen">
      <TeamHero />
      <TeamStats />
      <TeamGrid initialData={teamData} />
    </div>
  )
}

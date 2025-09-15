import { notFound } from 'next/navigation'
import { getTeamMembers } from '@/lib/database'
import AgentProfile from '@/components/agent/AgentProfile'

interface AgentPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const result = await getTeamMembers()
  if (!result.success) return []
  
  return result.data.map((member) => ({
    slug: member.name.toLowerCase().replace(/\s+/g, '-')
  }))
}

export async function generateMetadata({ params }: AgentPageProps) {
  const result = await getTeamMembers()
  if (!result.success) return {}
  
  const member = result.data.find(m => 
    m.name.toLowerCase().replace(/\s+/g, '-') === params.slug
  )
  
  if (!member) return {}
  
  return {
    title: `${member.name} - Insurance Agent | Pontotoc Insurance Agency`,
    description: member.bio,
    openGraph: {
      title: `${member.name} - Insurance Agent`,
      description: member.bio,
      images: [member.image_url || '/team/default-avatar.jpg'],
    },
  }
}

export default async function AgentPage({ params }: AgentPageProps) {
  const result = await getTeamMembers()
  if (!result.success) {
    notFound()
  }
  
  const member = result.data.find(m => 
    m.name.toLowerCase().replace(/\s+/g, '-') === params.slug
  )
  
  if (!member) {
    notFound()
  }
  
  // Convert database member to frontend format
  const frontendMember = {
    id: member.id,
    name: member.name,
    title: member.title,
    bio: member.bio,
    image: member.image_url || '/team/default-avatar.jpg',
    email: member.email || '',
    phone: member.phone || '',
    specialties: member.specialties || [],
    licenses: member.licenses || [],
    yearsExperience: member.years_experience || 0,
    displayOrder: member.display_order || 1,
    isActive: member.is_active,
    socialMedia: member.social_media || {}
  }
  
  return <AgentProfile member={frontendMember} />
}

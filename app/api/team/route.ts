import { NextRequest, NextResponse } from 'next/server'
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../../../lib/database'

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

// Helper function to convert frontend team member to database format
function convertTeamMemberToDatabase(frontendMember: any) {
  return {
    name: frontendMember.name,
    title: frontendMember.title,
    bio: frontendMember.bio,
    image_url: frontendMember.image,
    email: frontendMember.email || null,
    phone: frontendMember.phone || null,
    specialties: frontendMember.specialties || [],
    licenses: frontendMember.licenses || [],
    years_experience: frontendMember.yearsExperience || 0,
    display_order: frontendMember.displayOrder || 1,
    social_media: frontendMember.socialMedia || {},
    is_active: frontendMember.isActive !== false
  }
}

export async function GET() {
  try {
    console.log('Team API: Starting to fetch team members...')
    const result = await getTeamMembers()
    console.log('Team API: Database result:', result)
    
    if (!result.success) {
      console.error('Team API: Database error:', result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Convert database format to frontend format
    const teamMembers = result.data?.map(convertTeamMemberToFrontend) || []
    console.log('Team API: Converted team members:', teamMembers)
    
    // Return in the expected format with settings
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

    console.log('Team API: Final team data:', teamData)
    return NextResponse.json(teamData)
  } catch (error) {
    console.error('Team API: Error reading team data:', error)
    return NextResponse.json({ error: 'Failed to read team data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, member, memberId } = await request.json()
    
    switch (action) {
      case 'create':
        if (!member) {
          return NextResponse.json({ error: 'Member data required for create' }, { status: 400 })
        }
        
        const createResult = await createTeamMember(convertTeamMemberToDatabase(member))
        if (!createResult.success) {
          return NextResponse.json({ error: createResult.error }, { status: 500 })
        }
        
        return NextResponse.json({ success: true, data: createResult.data })
        
      case 'update':
        if (!memberId || !member) {
          return NextResponse.json({ error: 'Member ID and data required for update' }, { status: 400 })
        }
        
        const updateResult = await updateTeamMember(memberId, convertTeamMemberToDatabase(member))
        if (!updateResult.success) {
          return NextResponse.json({ error: updateResult.error }, { status: 500 })
        }
        
        return NextResponse.json({ success: true, data: updateResult.data })
        
      case 'delete':
        if (!memberId) {
          return NextResponse.json({ error: 'Member ID required for delete' }, { status: 400 })
        }
        
        const deleteResult = await deleteTeamMember(memberId)
        if (!deleteResult.success) {
          return NextResponse.json({ error: deleteResult.error }, { status: 500 })
        }
        
        return NextResponse.json({ success: true })
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error processing team data:', error)
    return NextResponse.json({ error: 'Failed to process team data' }, { status: 500 })
  }
}

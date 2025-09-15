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
    licenses: [], // Not stored in database yet
    yearsExperience: 0, // Not stored in database yet
    displayOrder: 1, // Not stored in database yet
    isActive: dbMember.is_active,
    socialMedia: {} // Not stored in database yet
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
    is_active: frontendMember.isActive !== false
  }
}

export async function GET() {
  try {
    const result = await getTeamMembers()
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Convert database format to frontend format
    const teamMembers = result.data?.map(convertTeamMemberToFrontend) || []
    
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

    return NextResponse.json(teamData)
  } catch (error) {
    console.error('Error reading team data:', error)
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

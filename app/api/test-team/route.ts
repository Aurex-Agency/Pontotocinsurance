import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test data to see if the API route is working
    const testData = {
      teamMembers: [
        {
          id: "test-1",
          name: "Test Member",
          title: "Test Title",
          bio: "Test bio",
          image: "/team/default-avatar.jpg",
          email: "test@example.com",
          phone: "(555) 123-4567",
          specialties: ["Test Specialty"],
          licenses: ["Test License"],
          yearsExperience: 5,
          displayOrder: 1,
          isActive: true,
          socialMedia: {}
        }
      ],
      settings: {
        showSocialMedia: true,
        showContactInfo: true,
        showSpecialties: true,
        showExperience: true,
        gridColumns: 3,
        enableDragDrop: true
      }
    }

    return NextResponse.json(testData)
  } catch (error) {
    console.error('Error in test API:', error)
    return NextResponse.json({ error: 'Test API failed' }, { status: 500 })
  }
}

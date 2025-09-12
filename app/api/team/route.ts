import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const TEAM_DATA_PATH = path.join(process.cwd(), 'lib', 'team-data.json')

// In-memory storage for production (resets on server restart)
let teamDataCache: any = null

// Load initial data
function loadInitialData() {
  try {
    const data = fs.readFileSync(TEAM_DATA_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading team data:', error)
    // Return default data if file doesn't exist
    return {
      teamMembers: [
        {
          id: '1',
          name: 'John Smith',
          position: 'Senior Insurance Agent',
          bio: 'With over 10 years of experience in the insurance industry, John specializes in home and auto insurance.',
          image: '/team/default-avatar.jpg',
          email: 'john@pontotocinsuranceagency.com',
          phone: '(662) 200-2249',
          specialties: ['Home Insurance', 'Auto Insurance'],
          isVisible: true,
          displayOrder: 1
        }
      ]
    }
  }
}

export async function GET() {
  try {
    // In production, use cache; in development, read from file
    if (process.env.NODE_ENV === 'production') {
      if (!teamDataCache) {
        teamDataCache = loadInitialData()
      }
      return NextResponse.json(teamDataCache)
    } else {
      const data = fs.readFileSync(TEAM_DATA_PATH, 'utf8')
      const teamData = JSON.parse(data)
      return NextResponse.json(teamData)
    }
  } catch (error) {
    console.error('Error reading team data:', error)
    return NextResponse.json({ error: 'Failed to read team data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const teamData = await request.json()
    
    // Validate the data structure
    if (!teamData.teamMembers || !Array.isArray(teamData.teamMembers)) {
      return NextResponse.json({ error: 'Invalid team data structure' }, { status: 400 })
    }

    if (process.env.NODE_ENV === 'production') {
      // In production, update the in-memory cache
      teamDataCache = teamData
      console.log('Team data updated in memory (production mode)')
    } else {
      // In development, write to file
      fs.writeFileSync(TEAM_DATA_PATH, JSON.stringify(teamData, null, 2))
      console.log('Team data updated in file (development mode)')
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating team data:', error)
    return NextResponse.json({ error: 'Failed to update team data' }, { status: 500 })
  }
}

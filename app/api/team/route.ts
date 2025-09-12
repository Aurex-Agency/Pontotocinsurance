import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const TEAM_DATA_PATH = path.join(process.cwd(), 'lib', 'team-data.json')

export async function GET() {
  try {
    const data = fs.readFileSync(TEAM_DATA_PATH, 'utf8')
    const teamData = JSON.parse(data)
    return NextResponse.json(teamData)
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

    // Write the updated data to the file
    fs.writeFileSync(TEAM_DATA_PATH, JSON.stringify(teamData, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating team data:', error)
    return NextResponse.json({ error: 'Failed to update team data' }, { status: 500 })
  }
}

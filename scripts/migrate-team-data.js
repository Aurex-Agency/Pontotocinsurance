const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value) {
      process.env[key] = value
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Load team data from JSON file
const teamDataPath = path.join(__dirname, '..', 'lib', 'team-data.json')
const teamData = JSON.parse(fs.readFileSync(teamDataPath, 'utf8'))

async function migrateTeamData() {
  console.log('Starting team data migration...')
  
  try {
    // First, clear existing team members
    console.log('Clearing existing team members...')
    const { error: deleteError } = await supabase
      .from('team_members')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all records
    
    if (deleteError) {
      console.error('Error clearing existing data:', deleteError)
      return
    }
    
    console.log('Existing team members cleared')
    
    // Insert team members from JSON
    console.log('Inserting team members from JSON...')
    
    for (const member of teamData.teamMembers) {
      const dbMember = {
        name: member.name,
        title: member.title,
        bio: member.bio,
        image_url: member.image,
        email: member.email || null,
        phone: member.phone || null,
        specialties: member.specialties || [],
        is_active: member.isActive !== false
      }
      
      const { data, error } = await supabase
        .from('team_members')
        .insert([dbMember])
        .select()
      
      if (error) {
        console.error(`Error inserting ${member.name}:`, error)
      } else {
        console.log(`✓ Migrated ${member.name}`)
      }
    }
    
    console.log('Team data migration completed successfully!')
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

migrateTeamData()

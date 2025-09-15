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

async function checkTeamData() {
  console.log('Checking all team members in database...')
  
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) {
      console.error('Error fetching team data:', error)
      return
    }
    
    console.log(`Found ${data.length} team members:`)
    data.forEach((member, index) => {
      console.log(`${index + 1}. ${member.name} (${member.title}) - Active: ${member.is_active}`)
    })
    
  } catch (error) {
    console.error('Check failed:', error)
  }
}

checkTeamData()

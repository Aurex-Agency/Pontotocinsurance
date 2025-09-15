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

async function addMissingColumns() {
  console.log('Adding missing columns to team_members table...')
  
  try {
    // Add years_experience column
    console.log('Adding years_experience column...')
    const { error: yearsError } = await supabase
      .from('team_members')
      .select('years_experience')
      .limit(1)
    
    if (yearsError && yearsError.code === 'PGRST204') {
      console.log('years_experience column does not exist, need to add it')
      console.log('Please run this SQL in Supabase:')
      console.log('ALTER TABLE team_members ADD COLUMN years_experience INTEGER DEFAULT 0;')
    } else {
      console.log('years_experience column already exists')
    }

    // Add display_order column
    console.log('Adding display_order column...')
    const { error: orderError } = await supabase
      .from('team_members')
      .select('display_order')
      .limit(1)
    
    if (orderError && orderError.code === 'PGRST204') {
      console.log('display_order column does not exist, need to add it')
      console.log('Please run this SQL in Supabase:')
      console.log('ALTER TABLE team_members ADD COLUMN display_order INTEGER DEFAULT 1;')
    } else {
      console.log('display_order column already exists')
    }

    // Add licenses column
    console.log('Adding licenses column...')
    const { error: licensesError } = await supabase
      .from('team_members')
      .select('licenses')
      .limit(1)
    
    if (licensesError && licensesError.code === 'PGRST204') {
      console.log('licenses column does not exist, need to add it')
      console.log('Please run this SQL in Supabase:')
      console.log('ALTER TABLE team_members ADD COLUMN licenses TEXT[];')
    } else {
      console.log('licenses column already exists')
    }

    // Add social_media column
    console.log('Adding social_media column...')
    const { error: socialError } = await supabase
      .from('team_members')
      .select('social_media')
      .limit(1)
    
    if (socialError && socialError.code === 'PGRST204') {
      console.log('social_media column does not exist, need to add it')
      console.log('Please run this SQL in Supabase:')
      console.log('ALTER TABLE team_members ADD COLUMN social_media JSONB DEFAULT \'{}\';')
    } else {
      console.log('social_media column already exists')
    }

    console.log('\nIf any columns need to be added, please run the SQL commands in Supabase SQL Editor.')
    
  } catch (error) {
    console.error('Check failed:', error)
  }
}

addMissingColumns()

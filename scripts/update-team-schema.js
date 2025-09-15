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

async function updateTeamSchema() {
  console.log('Updating team_members table schema...')
  
  try {
    // Update image_url column to TEXT
    console.log('Updating image_url column to TEXT...')
    const { error: imageError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE team_members ALTER COLUMN image_url TYPE TEXT;'
    })
    
    if (imageError) {
      console.log('Image URL column might already be TEXT or error:', imageError.message)
    } else {
      console.log('✓ Updated image_url column to TEXT')
    }

    // Add new columns
    console.log('Adding new columns...')
    
    // Add licenses column
    const { error: licensesError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE team_members ADD COLUMN IF NOT EXISTS licenses TEXT[];'
    })
    
    if (licensesError) {
      console.log('Licenses column error:', licensesError.message)
    } else {
      console.log('✓ Added licenses column')
    }

    // Add years_experience column
    const { error: yearsError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE team_members ADD COLUMN IF NOT EXISTS years_experience INTEGER DEFAULT 0;'
    })
    
    if (yearsError) {
      console.log('Years experience column error:', yearsError.message)
    } else {
      console.log('✓ Added years_experience column')
    }

    // Add display_order column
    const { error: orderError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE team_members ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 1;'
    })
    
    if (orderError) {
      console.log('Display order column error:', orderError.message)
    } else {
      console.log('✓ Added display_order column')
    }

    // Add social_media column
    const { error: socialError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE team_members ADD COLUMN IF NOT EXISTS social_media JSONB DEFAULT \'{}\';'
    })
    
    if (socialError) {
      console.log('Social media column error:', socialError.message)
    } else {
      console.log('✓ Added social_media column')
    }

    console.log('Schema update completed successfully!')
    
  } catch (error) {
    console.error('Schema update failed:', error)
  }
}

updateTeamSchema()

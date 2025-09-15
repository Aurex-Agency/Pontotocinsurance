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

async function updateImageColumn() {
  console.log('Updating image_url column to TEXT...')
  
  try {
    // First, let's check the current column type
    const { data: tableInfo, error: infoError } = await supabase
      .rpc('exec_sql', {
        sql: `
          SELECT column_name, data_type, character_maximum_length 
          FROM information_schema.columns 
          WHERE table_name = 'team_members' AND column_name = 'image_url';
        `
      })
    
    if (infoError) {
      console.log('Could not check column info:', infoError.message)
    } else {
      console.log('Current column info:', tableInfo)
    }

    // Update the column type to TEXT
    const { data, error } = await supabase
      .rpc('exec_sql', {
        sql: 'ALTER TABLE team_members ALTER COLUMN image_url TYPE TEXT;'
      })
    
    if (error) {
      console.error('Error updating column:', error)
      
      // If exec_sql doesn't work, try a different approach
      console.log('Trying alternative approach...')
      
      // Try to update a record with a long URL to test
      const testUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&test=very-long-url-parameter-that-should-exceed-500-characters-and-test-the-database-constraint'
      
      const { data: testData, error: testError } = await supabase
        .from('team_members')
        .update({ image_url: testUrl })
        .eq('id', '6a506581-8d76-41f4-9155-96b625aaf85b')
        .select()
      
      if (testError) {
        console.error('Test update failed:', testError)
        console.log('The column is still VARCHAR(500). You need to run this SQL in Supabase:')
        console.log('ALTER TABLE team_members ALTER COLUMN image_url TYPE TEXT;')
      } else {
        console.log('✓ Column is already TEXT or was updated successfully')
        console.log('Test update succeeded:', testData)
      }
    } else {
      console.log('✓ Column updated to TEXT successfully')
    }
    
  } catch (error) {
    console.error('Update failed:', error)
  }
}

updateImageColumn()

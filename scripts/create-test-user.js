const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createTestUser() {
  try {
    console.log('Creating test user...')
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@pontotocinsuranceagency.com',
      password: 'admin123456',
      user_metadata: {
        full_name: 'Admin User'
      }
    })

    if (error) {
      console.error('Error creating user:', error)
      return
    }

    console.log('Test user created successfully:', data.user)
  } catch (error) {
    console.error('Error:', error)
  }
}

createTestUser()

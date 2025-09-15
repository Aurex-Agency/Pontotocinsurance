const { createClient } = require('@supabase/supabase-js')
const path = require('path')
const fs = require('fs')

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

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function initSiteSettings() {
  console.log('Initializing site settings...')
  
  const defaultSettings = [
    {
      key: 'site_phone',
      value: '(662) 200-2249',
      description: 'Primary phone number displayed throughout the site'
    },
    {
      key: 'site_email',
      value: 'info@pontotocinsuranceagency.com',
      description: 'Primary email address displayed throughout the site'
    },
    {
      key: 'site_address',
      value: '158 MS-15, Suite D, Pontotoc, MS 38863',
      description: 'Business address displayed throughout the site'
    },
    {
      key: 'site_name',
      value: 'Pontotoc Insurance Agency',
      description: 'Business name displayed throughout the site'
    },
    {
      key: 'site_hours',
      value: 'Mon - Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM, Sun: Closed',
      description: 'Business hours displayed throughout the site'
    }
  ]

  try {
    for (const setting of defaultSettings) {
      // Check if setting already exists
      const { data: existing } = await supabaseAdmin
        .from('site_settings')
        .select('id')
        .eq('key', setting.key)
        .single()

      if (existing) {
        console.log(`Setting '${setting.key}' already exists, skipping...`)
        continue
      }

      // Insert new setting
      const { error } = await supabaseAdmin
        .from('site_settings')
        .insert([setting])

      if (error) {
        console.error(`Error inserting setting '${setting.key}':`, error)
      } else {
        console.log(`✓ Inserted setting: ${setting.key}`)
      }
    }

    console.log('Site settings initialization completed!')
  } catch (error) {
    console.error('Error during site settings initialization:', error)
  }
}

initSiteSettings()

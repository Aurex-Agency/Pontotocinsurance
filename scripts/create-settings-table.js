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

async function createSettingsTable() {
  console.log('Creating site_settings table and initializing settings...')
  
  try {
    // First, let's try to create the table using a direct SQL approach
    // We'll use the Supabase dashboard to create the table, then just initialize the data
    
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

    console.log('Please create the site_settings table in your Supabase dashboard with the following SQL:')
    console.log(`
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to read site settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Allow admins to manage site settings" ON site_settings
  FOR ALL USING (auth.role() = 'service_role');

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `)
    
    console.log('\nAfter creating the table, run: npm run init-settings')
    
  } catch (error) {
    console.error('Error:', error)
  }
}

createSettingsTable()

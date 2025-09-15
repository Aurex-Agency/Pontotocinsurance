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

async function applySchema() {
  console.log('Applying site_settings table schema...')
  
  try {
    // Create site_settings table
    const { error: createError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS site_settings (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          key VARCHAR(100) UNIQUE NOT NULL,
          value TEXT NOT NULL,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (createError) {
      console.error('Error creating site_settings table:', createError)
      return
    }

    console.log('✓ site_settings table created')

    // Enable RLS
    const { error: rlsError } = await supabaseAdmin.rpc('exec_sql', {
      sql: 'ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;'
    })

    if (rlsError) {
      console.error('Error enabling RLS:', rlsError)
    } else {
      console.log('✓ RLS enabled on site_settings table')
    }

    // Create RLS policies
    const { error: policy1Error } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Allow public to read site settings" ON site_settings
        FOR SELECT USING (true);
      `
    })

    if (policy1Error) {
      console.error('Error creating public read policy:', policy1Error)
    } else {
      console.log('✓ Public read policy created')
    }

    const { error: policy2Error } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE POLICY "Allow admins to manage site settings" ON site_settings
        FOR ALL USING (auth.role() = 'service_role');
      `
    })

    if (policy2Error) {
      console.error('Error creating admin manage policy:', policy2Error)
    } else {
      console.log('✓ Admin manage policy created')
    }

    // Create trigger for updated_at
    const { error: triggerError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TRIGGER update_site_settings_updated_at
        BEFORE UPDATE ON site_settings
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
      `
    })

    if (triggerError) {
      console.error('Error creating trigger:', triggerError)
    } else {
      console.log('✓ Updated_at trigger created')
    }

    console.log('Schema application completed successfully!')
  } catch (error) {
    console.error('Error during schema application:', error)
  }
}

applySchema()

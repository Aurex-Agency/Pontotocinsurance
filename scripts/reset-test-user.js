require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Supabase URL or Service Role Key is missing. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function resetTestUser() {
  console.log('Resetting test user...');
  
  try {
    // First, try to delete the existing user
    const { data: users } = await supabase.auth.admin.listUsers();
    const existingUser = users.users.find(user => user.email === 'admin@pontotocinsuranceagency.com');
    
    if (existingUser) {
      console.log('Deleting existing user...');
      const { error: deleteError } = await supabase.auth.admin.deleteUser(existingUser.id);
      if (deleteError) {
        console.log('Could not delete existing user:', deleteError.message);
      } else {
        console.log('Existing user deleted successfully');
      }
    }

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new user
    console.log('Creating new test user...');
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@pontotocinsuranceagency.com',
      password: 'admin123',
      user_metadata: {
        full_name: 'Admin User',
      },
      email_confirm: true, // Automatically confirm the email
    });

    if (error) {
      throw error;
    }

    console.log('Test user created successfully!');
    console.log('Email: admin@pontotocinsuranceagency.com');
    console.log('Password: admin123');
    console.log('User ID:', data.user.id);
    
  } catch (error) {
    console.error('Error resetting test user:', error.message);
  }
}

resetTestUser();

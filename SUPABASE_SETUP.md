# Supabase Setup for Pontotoc Insurance Agency

## Prerequisites
- Supabase project: https://supabase.com/dashboard/project/yeqisjuwcqumsynmlcqf
- Node.js and npm installed

## Setup Steps

### 1. Get Your API Keys
1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/yeqisjuwcqumsynmlcqf
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key
4. Copy your service_role key (keep this secret!)

### 2. Configure Environment Variables
✅ **Anon Key Already Configured!** Your `.env.local` file has been set up with:
- Project URL: `https://yeqisjuwcqumsynmlcqf.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (configured)

**Still needed:**
1. Get your **service_role key** from your Supabase dashboard:
   - Go to Settings → API
   - Copy the `service_role` key (keep this secret!)
   - Update `.env.local` with: `SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here`

### 3. Set Up Database Schema
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL script to create all tables and policies

### 4. Test the Integration
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the contact form and other features to ensure Supabase is working

## Database Tables Created

### contact_submissions
- Stores contact form submissions from the website
- Fields: id, name, email, phone, message, service_type, created_at, updated_at

### quote_requests
- Stores quote request submissions
- Fields: id, name, email, phone, service_type, additional_info, status, created_at, updated_at

### team_members
- Stores team member information
- Fields: id, name, title, bio, image_url, email, phone, specialties, is_active, created_at, updated_at

### admin_users
- Stores admin user accounts for the admin panel
- Fields: id, email, password_hash, name, role, is_active, created_at, updated_at

## Security Features

- Row Level Security (RLS) enabled on all tables
- Public users can only insert into contact_submissions and quote_requests
- Public users can only read active team members
- Admin operations require service_role authentication
- All tables have proper indexes for performance

## Usage Examples

### Contact Form Submission
```typescript
import { submitContactForm } from '@/lib/database'

const result = await submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '555-1234',
  message: 'I need help with auto insurance',
  service_type: 'auto'
})
```

### Team Member Management
```typescript
import { getTeamMembers, createTeamMember } from '@/lib/database'

// Get all team members
const { data: members } = await getTeamMembers()

// Create new team member (admin only)
const result = await createTeamMember({
  name: 'Jane Smith',
  title: 'Insurance Agent',
  bio: 'Experienced agent specializing in...',
  specialties: ['Auto Insurance', 'Home Insurance']
})
```

## Next Steps

1. Complete the environment variable setup
2. Run the database schema
3. Test the integration
4. Customize the database functions as needed for your specific requirements
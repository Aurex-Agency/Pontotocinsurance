-- Supabase Database Schema for Pontotoc Insurance Agency
-- Run this in your Supabase SQL editor

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  service_type VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quote_requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  service_type VARCHAR(100) NOT NULL,
  additional_info TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  email VARCHAR(255),
  phone VARCHAR(20),
  specialties TEXT[],
  licenses TEXT[],
  years_experience INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 1,
  social_media JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests(email);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_team_members_is_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Contact submissions: Allow public to insert, admins to read all
CREATE POLICY "Allow public to insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read contact submissions" ON contact_submissions
  FOR SELECT USING (true);

CREATE POLICY "Allow admins to read all contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'service_role');

-- Quote requests: Allow public to insert, admins to read all
CREATE POLICY "Allow public to insert quote requests" ON quote_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read quote requests" ON quote_requests
  FOR SELECT USING (true);

CREATE POLICY "Allow admins to read all quote requests" ON quote_requests
  FOR SELECT USING (auth.role() = 'service_role');

-- Team members: Allow public to read active members, admins to manage all
CREATE POLICY "Allow public to read active team members" ON team_members
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow admins to manage team members" ON team_members
  FOR ALL USING (auth.role() = 'service_role');

-- Admin users: Only service role can access
CREATE POLICY "Allow service role to manage admin users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample team member data
INSERT INTO team_members (name, title, bio, specialties) VALUES
('John Smith', 'Senior Insurance Agent', 'With over 15 years of experience in the insurance industry, John specializes in auto, home, and life insurance. He is committed to finding the best coverage options for his clients.', ARRAY['Auto Insurance', 'Home Insurance', 'Life Insurance']),
('Sarah Johnson', 'Medicare Specialist', 'Sarah has dedicated her career to helping seniors navigate Medicare options. She is certified in Medicare Advantage and Supplement plans.', ARRAY['Medicare', 'Medicare Advantage', 'Medicare Supplement']),
('Mike Davis', 'Commercial Insurance Agent', 'Mike focuses on commercial insurance solutions for businesses of all sizes. He has extensive experience with liability and property coverage.', ARRAY['Commercial Insurance', 'Business Insurance', 'Liability Insurance'])
ON CONFLICT DO NOTHING;
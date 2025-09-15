-- Update team_members table schema to support all team member fields
-- Run this in your Supabase SQL editor

-- Update image_url column to TEXT to support longer URLs
ALTER TABLE team_members ALTER COLUMN image_url TYPE TEXT;

-- Add new columns for complete team member data
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS licenses TEXT[];
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS years_experience INTEGER DEFAULT 0;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 1;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS social_media JSONB DEFAULT '{}';

-- Update existing records to have proper display order
UPDATE team_members SET display_order = 1 WHERE display_order IS NULL;

-- Update existing records to have proper years_experience
UPDATE team_members SET years_experience = 0 WHERE years_experience IS NULL;

-- Update existing records to have empty social_media object
UPDATE team_members SET social_media = '{}' WHERE social_media IS NULL;

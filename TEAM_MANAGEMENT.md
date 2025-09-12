# Team Management System

This document explains how to use the team management system for the Pontotoc Insurance Agency website.

## Overview

The team management system allows administrators to:
- Add new team members
- Edit existing team member information
- Delete team members
- Reorder team members on the team page
- Toggle team member visibility
- Upload and manage team member photos

## Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Use the demo credentials:
   - Username: `admin`
   - Password: `pontotoc2024`

## Features

### Team Page (`/team`)
- Displays all active team members in a responsive grid
- Click on any team member to view detailed information
- Mobile-friendly design with smooth animations
- Professional team member cards with contact information

### Admin Panel (`/admin/team`)
- **Add Team Members**: Click "Add Team Member" to create new team members
- **Edit Team Members**: Click the edit icon next to any team member
- **Delete Team Members**: Click the delete icon (with confirmation)
- **Toggle Visibility**: Use the eye icon to show/hide team members
- **Reorder Members**: Drag and drop team members to change their display order
- **Image Management**: Upload images via drag & drop or URL input

### Team Member Data Structure

Each team member includes:
- **Basic Info**: Name, title, bio, email, phone
- **Experience**: Years of experience, licenses
- **Specialties**: Insurance areas of expertise
- **Social Media**: LinkedIn and Facebook links
- **Display Settings**: Order, visibility status
- **Profile Image**: Professional headshot

## Technical Implementation

### Data Storage
- Team data is stored in `lib/team-data.json`
- API endpoints handle CRUD operations at `/api/team`
- Changes are persisted to the JSON file

### Components
- `TeamHero`: Hero section with team statistics
- `TeamStats`: Why choose our team section
- `TeamGrid`: Main team member display grid
- `TeamMemberModal`: Detailed team member view
- `TeamAdmin`: Admin interface for managing team
- `TeamMemberForm`: Form for adding/editing members
- `ImageUpload`: Image upload and management component

### Authentication
- Simple localStorage-based authentication
- Admin routes are protected by the admin layout
- Demo credentials for testing

## Usage Instructions

### Adding a New Team Member
1. Go to `/admin/team`
2. Click "Add Team Member"
3. Fill in all required fields:
   - Name, title, bio
   - Contact information
   - Years of experience
   - Specialties and licenses
   - Social media links
4. Upload a professional headshot
5. Click "Add Member"

### Editing a Team Member
1. Find the team member in the admin list
2. Click the edit icon
3. Modify any fields as needed
4. Click "Update Member"

### Reordering Team Members
1. In the admin panel, drag the grip handle (⋮⋮) next to any team member
2. Drop them in the desired position
3. The display order will be automatically saved

### Managing Team Member Visibility
1. Use the eye icon to toggle team member visibility
2. Hidden members won't appear on the public team page
3. This is useful for temporarily removing members or keeping them in the system

## Customization

### Adding New Specialties
Edit the `availableSpecialties` array in `TeamMemberForm.tsx`:
```javascript
const availableSpecialties = [
  'Home Insurance', 'Auto Insurance', 'Life Insurance',
  // Add new specialties here
]
```

### Adding New Licenses
Edit the `availableLicenses` array in `TeamMemberForm.tsx`:
```javascript
const availableLicenses = [
  'Property & Casualty', 'Life & Health', 'Medicare',
  // Add new licenses here
]
```

### Styling
The team components use the existing Tailwind CSS classes and color scheme defined in `tailwind.config.js`.

## Security Notes

- The current authentication system is for demo purposes
- In production, implement proper authentication with secure sessions
- Consider adding role-based permissions
- Validate all file uploads and sanitize user inputs

## Future Enhancements

- Real-time updates when team data changes
- Bulk operations (delete multiple members, bulk reorder)
- Team member analytics and performance metrics
- Integration with HR systems
- Advanced image editing and cropping
- Team member search and filtering
- Export team data functionality

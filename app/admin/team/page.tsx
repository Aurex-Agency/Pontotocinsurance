import { Metadata } from 'next'
import TeamAdmin from '@/components/admin/TeamAdmin'

export const metadata: Metadata = {
  title: 'Team Management - Admin Panel',
  description: 'Manage team members, add new agents, and update team information.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TeamAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h1>
          <p className="text-gray-600">Manage your team members, add new agents, and update team information.</p>
        </div>
        <TeamAdmin />
      </div>
    </div>
  )
}

'use client'

import { usePathname } from 'next/navigation'
import { Shield, LogOut, Users, Settings, Mail } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminAuthProvider from './AuthProvider'

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, loading, signOut, isAuthenticated } = useAuth()
  const router = useRouter()

  // Skip authentication check for login page
  const isLoginPage = pathname === '/admin/login'

  // For login page, render children directly without admin layout
  if (isLoginPage) {
    return <>{children}</>
  }

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [loading, isAuthenticated, router])

  const handleLogout = async () => {
    await signOut()
    router.push('/admin/login')
  }

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, show nothing (will redirect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Shield size={20} className="text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">
                  {user?.user_metadata?.full_name || user?.email || 'Admin User'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex space-x-8">
            <Link
              href="/admin"
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                pathname === '/admin' || pathname === '/admin/team'
                  ? 'border-primary-600 text-primary-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users size={18} />
              <span>Team Management</span>
            </Link>
            <Link
              href="/admin/leads"
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                pathname === '/admin/leads'
                  ? 'border-primary-600 text-primary-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Mail size={18} />
              <span>Leads</span>
            </Link>
            <Link
              href="/admin/settings"
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                pathname === '/admin/settings'
                  ? 'border-primary-600 text-primary-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <main className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <AdminContent>{children}</AdminContent>
    </AdminAuthProvider>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Shield, LogOut, Users, Settings } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Skip authentication check for login page
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) {
      setIsLoading(false)
      return
    }

    // Check if user is authenticated
    const authToken = localStorage.getItem('adminAuth')
    if (authToken === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
    setIsLoading(false)
  }, [router, isLoginPage])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  // For login page, render children directly without admin layout
  if (isLoginPage) {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

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
                <p className="text-sm text-gray-600">Pontotoc Insurance Agency</p>
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
              href="/admin/team"
              className="flex items-center space-x-2 py-4 px-2 border-b-2 border-primary-600 text-primary-600 font-medium"
            >
              <Users size={18} />
              <span>Team Management</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-2 py-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  )
}

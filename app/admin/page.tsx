'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getContactSubmissions, getQuoteRequests } from '@/lib/database'
import { Users, Mail, FileText, TrendingUp, Calendar, Phone } from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  service_type: string
  created_at: string
}

interface QuoteRequest {
  id: string
  name: string
  email: string
  phone: string
  service_type: string
  additional_info: string
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('adminAuth')
    if (!authStatus) {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    loadData()
  }, [router])

  const loadData = async () => {
    setLoading(true)
    try {
      const [contactsResult, quotesResult] = await Promise.all([
        getContactSubmissions(),
        getQuoteRequests()
      ])

      if (contactsResult.success) {
        setContactSubmissions(contactsResult.data || [])
      }
      if (quotesResult.success) {
        setQuoteRequests(quotesResult.data || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your insurance agency</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadData}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contact Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{contactSubmissions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Quote Requests</p>
                <p className="text-2xl font-bold text-gray-900">{quoteRequests.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{contactSubmissions.length + quoteRequests.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Contact Submissions */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Contact Submissions</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {contactSubmissions.slice(0, 5).map((submission) => (
                <div key={submission.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{submission.name}</p>
                      <p className="text-sm text-gray-500">{submission.email}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {submission.service_type && `Service: ${submission.service_type}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{formatDate(submission.created_at)}</p>
                      <div className="flex items-center mt-1">
                        <Phone className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{submission.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {contactSubmissions.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No contact submissions yet
                </div>
              )}
            </div>
          </div>

          {/* Recent Quote Requests */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Quote Requests</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {quoteRequests.slice(0, 5).map((request) => (
                <div key={request.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{request.name}</p>
                      <p className="text-sm text-gray-500">{request.email}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Service: {request.service_type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{formatDate(request.created_at)}</p>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {request.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {quoteRequests.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No quote requests yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => router.push('/admin/team')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Users className="h-8 w-8 text-primary-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Manage Team</h4>
                  <p className="text-sm text-gray-500">Add or edit team members</p>
                </button>

                <button
                  onClick={() => router.push('/contact')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Mail className="h-8 w-8 text-primary-600 mb-2" />
                  <h4 className="font-medium text-gray-900">View Contact Page</h4>
                  <p className="text-sm text-gray-500">See the public contact form</p>
                </button>

                <button
                  onClick={loadData}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <TrendingUp className="h-8 w-8 text-primary-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Refresh Data</h4>
                  <p className="text-sm text-gray-500">Update dashboard information</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
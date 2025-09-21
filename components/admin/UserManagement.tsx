'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  UserPlus,
  Trash2,
  Mail,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
  Loader2,
  KeyRound
} from 'lucide-react'
// Remove direct Supabase auth imports - we'll use API routes instead

// Define User interface locally since we removed the import
interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
  created_at: string
  last_sign_in_at?: string
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isResetting, setIsResetting] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    fullName: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/users')
      const result = await response.json()
      
      if (result.success) {
        setUsers(result.users || [])
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to fetch users' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch users' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      
      const result = await response.json()

      if (result.success) {
        setMessage({ type: 'success', text: 'User created successfully!' })
        setNewUser({ email: '', password: '', fullName: '' })
        setShowCreateForm(false)
        fetchUsers()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to create user' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create user' })
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    setIsDeleting(userId)
    setMessage(null)

    try {
      const response = await fetch(`/api/admin/users?userId=${userId}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()
      
      if (result.success) {
        setMessage({ type: 'success', text: 'User deleted successfully!' })
        fetchUsers()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete user' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete user' })
    } finally {
      setIsDeleting(null)
    }
  }

  const handleResetPassword = async (user: User) => {
    if (!user.email) {
      setMessage({ type: 'error', text: 'User email is required for password reset' })
      return
    }

    if (!confirm(`Send password reset email to ${user.email}?`)) {
      return
    }

    setIsResetting(user.id)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      })
      
      const result = await response.json()
      
      if (response.status === 429) {
        setMessage({ type: 'error', text: 'Email rate limit exceeded. Please wait a few minutes before trying again.' })
      } else if (result.success) {
        setMessage({ type: 'success', text: `Password reset email sent to ${user.email}` })
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to send password reset email' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send password reset email' })
    } finally {
      setIsResetting(null)
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Users size={24} className="text-primary-600" />
              <span>User Management</span>
            </h2>
            <p className="text-gray-600 mt-1">
              Manage admin users who have access to the backend
            </p>
          </div>
                 <button
                   onClick={() => setShowCreateForm(!showCreateForm)}
                   className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                 >
                   <UserPlus size={20} />
                   <span>Add User</span>
                 </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      {/* Create User Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New User</h3>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter password (minimum 6 characters)"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isCreating}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                {isCreating ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <UserPlus size={16} />
                )}
                <span>{isCreating ? 'Creating...' : 'Create User'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

             {/* Users List */}
             <div className="bg-white rounded-lg shadow">
               <div className="p-6 border-b border-gray-200">
                 <h3 className="text-lg font-semibold text-gray-900">Admin Users ({users.length})</h3>
               </div>
        <div className="divide-y divide-gray-200">
          {users.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Users size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No users found</p>
            </div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Shield size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Unknown User'}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail size={14} />
                        <span>{user.email || 'No email'}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>Created: {formatDate(user.created_at)}</span>
                        </div>
                        {user.last_sign_in_at && (
                          <div className="flex items-center space-x-1">
                            <Calendar size={12} />
                            <span>Last login: {formatDate(user.last_sign_in_at)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                         <div className="flex items-center space-x-2">
                           <button
                             onClick={() => handleResetPassword(user)}
                             disabled={isResetting === user.id || !user.email}
                             className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
                             title="Send password reset email"
                           >
                             {isResetting === user.id ? (
                               <Loader2 size={16} className="animate-spin" />
                             ) : (
                               <KeyRound size={16} />
                             )}
                           </button>
                           <button
                             onClick={() => handleDeleteUser(user.id)}
                             disabled={isDeleting === user.id}
                             className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                             title="Delete user"
                           >
                             {isDeleting === user.id ? (
                               <Loader2 size={16} className="animate-spin" />
                             ) : (
                               <Trash2 size={16} />
                             )}
                           </button>
                         </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default UserManagement

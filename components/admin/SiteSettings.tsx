'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Phone, Mail, MapPin, Clock, Building, AlertCircle, CheckCircle, Users } from 'lucide-react'
import UserManagement from './UserManagement'

interface SiteSettings {
  [key: string]: {
    value: string
    description: string
    id: string
  }
}

const SiteSettings = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'users'>('settings')
  const [settings, setSettings] = useState<SiteSettings>({})
  const [formData, setFormData] = useState({
    site_phone: '',
    site_email: '',
    site_address: '',
    site_name: '',
    site_hours: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Only render on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
      
      const response = await fetch('/api/settings', {
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      
      const result = await response.json()

      if (result.success) {
        setSettings(result.data)
        // Populate form data
        setFormData({
          site_phone: result.data.site_phone?.value || '',
          site_email: result.data.site_email?.value || '',
          site_address: result.data.site_address?.value || '',
          site_name: result.data.site_name?.value || '',
          site_hours: result.data.site_hours?.value || ''
        })
      } else {
        setMessage({ type: 'error', text: 'Failed to load settings' })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      setMessage({ type: 'error', text: 'Failed to load settings' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: formData }),
      })

      const result = await response.json()

      if (result.success) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' })
        // Refresh settings to get updated data
        await fetchSettings()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save settings' })
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setIsSaving(false)
    }
  }

  const settingFields = [
    {
      key: 'site_name',
      label: 'Business Name',
      icon: Building,
      placeholder: 'Enter business name',
      description: 'The name of your business displayed throughout the site'
    },
    {
      key: 'site_phone',
      label: 'Phone Number',
      icon: Phone,
      placeholder: 'Enter phone number',
      description: 'Primary phone number displayed in header and footer'
    },
    {
      key: 'site_email',
      label: 'Email Address',
      icon: Mail,
      placeholder: 'Enter email address',
      description: 'Primary email address displayed in header and footer'
    },
    {
      key: 'site_address',
      label: 'Business Address',
      icon: MapPin,
      placeholder: 'Enter business address',
      description: 'Complete business address displayed in footer'
    },
    {
      key: 'site_hours',
      label: 'Business Hours',
      icon: Clock,
      placeholder: 'Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM\nSun: Closed',
      description: 'Business hours displayed in footer (use multiple lines for better formatting)'
    }
  ]

  // Don't render on server side
  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="ml-4">Loading...</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="ml-4">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage site settings and user access
            </p>
          </div>
          {activeTab === 'settings' && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Save size={20} />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building size={16} className="inline mr-2" />
              Site Settings
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users size={16} className="inline mr-2" />
              User Management
            </button>
          </nav>
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

      {/* Tab Content */}
      {activeTab === 'settings' && (
        <>
          {/* Settings Form */}
          <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
          <p className="text-gray-600 text-sm mt-1">
            These settings will be displayed in the header, footer, and throughout the site
          </p>
        </div>

        <div className="p-6 space-y-6">
          {settingFields.map((field) => {
            const Icon = field.icon
            return (
              <div key={field.key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Icon size={16} className="text-gray-500" />
                    <span>{field.label}</span>
                  </div>
                </label>
                {field.key === 'site_hours' ? (
                  <textarea
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                )}
                <p className="text-xs text-gray-500">{field.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          <p className="text-gray-600 text-sm mt-1">
            How your contact information will appear on the website
          </p>
        </div>

        <div className="p-6">
          {/* Header Preview */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Header Preview</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <Phone size={14} />
                <span>{formData.site_phone || 'Phone number'}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Mail size={14} />
                <span>{formData.site_email || 'Email address'}</span>
              </div>
            </div>
          </div>

          {/* Footer Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Footer Preview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Building size={14} />
                <span className="font-medium">{formData.site_name || 'Business Name'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin size={14} />
                <span>{formData.site_address || 'Business address'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone size={14} />
                <span>{formData.site_phone || 'Phone number'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail size={14} />
                <span>{formData.site_email || 'Email address'}</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-600">
                <Clock size={14} className="mt-1" />
                <div className="whitespace-pre-line">{formData.site_hours || 'Business hours'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
      )}

      {activeTab === 'users' && <UserManagement />}
    </div>
  )
}

export default SiteSettings

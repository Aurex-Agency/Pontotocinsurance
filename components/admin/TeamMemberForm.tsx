'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, Upload, Save } from 'lucide-react'
import ImageUpload from './ImageUpload'

interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  image: string
  email: string
  phone: string
  specialties: string[]
  licenses: string[]
  yearsExperience: number
  displayOrder: number
  isActive: boolean
  socialMedia: {
    linkedin?: string
    facebook?: string
  }
}

interface TeamMemberFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (memberData: Partial<TeamMember>) => void
  member?: TeamMember | null
}

const TeamMemberForm = ({ isOpen, onClose, onSubmit, member }: TeamMemberFormProps) => {
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    title: '',
    bio: '',
    image: '/team/default-avatar.jpg',
    email: '',
    phone: '',
    specialties: [],
    licenses: [],
    yearsExperience: 0,
    isActive: true,
    socialMedia: {}
  })

  const [newSpecialty, setNewSpecialty] = useState('')
  const [newLicense, setNewLicense] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (member) {
      setFormData(member)
    } else {
      setFormData({
        name: '',
        title: '',
        bio: '',
        image: '/team/default-avatar.jpg',
        email: '',
        phone: '',
        specialties: [],
        licenses: [],
        yearsExperience: 0,
        isActive: true,
        socialMedia: {}
      })
    }
  }, [member])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }))
  }

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties?.includes(newSpecialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...(prev.specialties || []), newSpecialty.trim()]
      }))
      setNewSpecialty('')
    }
  }

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties?.filter(s => s !== specialty) || []
    }))
  }

  const addLicense = () => {
    if (newLicense.trim() && !formData.licenses?.includes(newLicense.trim())) {
      setFormData(prev => ({
        ...prev,
        licenses: [...(prev.licenses || []), newLicense.trim()]
      }))
      setNewLicense('')
    }
  }

  const removeLicense = (license: string) => {
    setFormData(prev => ({
      ...prev,
      licenses: prev.licenses?.filter(l => l !== license) || []
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error('Error saving member:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableSpecialties = [
    'Home Insurance', 'Auto Insurance', 'Life Insurance', 'Health Insurance',
    'Medicare', 'Medicare Supplement', 'Medicare Advantage', 'Retirement Planning',
    'Umbrella Insurance', 'Business Insurance', 'Disability Insurance'
  ]

  const availableLicenses = [
    'Property & Casualty', 'Life & Health', 'Medicare', 'Series 6', 'Series 7',
    'Series 63', 'Series 65', 'Series 66'
  ]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {member ? 'Edit Team Member' : 'Add New Team Member'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio *
              </label>
              <textarea
                name="bio"
                value={formData.bio || ''}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                placeholder="Tell us about this team member's background and expertise..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience || 0}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <ImageUpload
                  value={formData.image || ''}
                  onChange={(value) => setFormData(prev => ({ ...prev, image: value }))}
                  placeholder="/team/member-name.jpg"
                />
              </div>
            </div>

            {/* Specialties */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialties
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.specialties?.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{specialty}</span>
                    <button
                      type="button"
                      onClick={() => removeSpecialty(specialty)}
                      className="text-primary-500 hover:text-primary-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <select
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a specialty...</option>
                  {availableSpecialties
                    .filter(s => !formData.specialties?.includes(s))
                    .map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Licenses */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Licenses
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.licenses?.map((license) => (
                  <span
                    key={license}
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{license}</span>
                    <button
                      type="button"
                      onClick={() => removeLicense(license)}
                      className="text-secondary-500 hover:text-secondary-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <select
                  value={newLicense}
                  onChange={(e) => setNewLicense(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a license...</option>
                  {availableLicenses
                    .filter(l => !formData.licenses?.includes(l))
                    .map(license => (
                      <option key={license} value={license}>{license}</option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={addLicense}
                  className="px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Social Media Links
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.socialMedia?.linkedin || ''}
                    onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Facebook</label>
                  <input
                    type="url"
                    value={formData.socialMedia?.facebook || ''}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="https://facebook.com/username"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive || false}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Show this member on the team page
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>{member ? 'Update Member' : 'Add Member'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TeamMemberForm

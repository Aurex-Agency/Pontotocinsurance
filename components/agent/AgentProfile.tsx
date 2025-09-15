'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  Share2, 
  Linkedin, 
  Facebook, 
  Instagram,
  Twitter,
  Globe,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react'

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
    instagram?: string
    twitter?: string
    website?: string
  }
}

interface AgentProfileProps {
  member: TeamMember
}

export default function AgentProfile({ member }: AgentProfileProps) {
  const [isVCardDownloading, setIsVCardDownloading] = useState(false)

  const handleVCardDownload = async () => {
    setIsVCardDownloading(true)
    
    // Create vCard content
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${member.name}
ORG:Pontotoc Insurance Agency
TITLE:${member.title}
TEL:${member.phone}
EMAIL:${member.email}
URL:${typeof window !== 'undefined' ? window.location.href : ''}
NOTE:${member.bio}
END:VCARD`

    // Create and download file
    const blob = new Blob([vCardContent], { type: 'text/vcard' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${member.name.replace(/\s+/g, '-')}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    setIsVCardDownloading(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${member.name} - Insurance Agent`,
          text: member.bio,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
    }
  }

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      url: member.socialMedia.linkedin, 
      icon: Linkedin, 
      color: 'bg-blue-600 hover:bg-blue-700' 
    },
    { 
      name: 'Facebook', 
      url: member.socialMedia.facebook, 
      icon: Facebook, 
      color: 'bg-blue-500 hover:bg-blue-600' 
    },
    { 
      name: 'Instagram', 
      url: member.socialMedia.instagram, 
      icon: Instagram, 
      color: 'bg-pink-500 hover:bg-pink-600' 
    },
    { 
      name: 'Twitter', 
      url: member.socialMedia.twitter, 
      icon: Twitter, 
      color: 'bg-sky-500 hover:bg-sky-600' 
    },
    { 
      name: 'Website', 
      url: member.socialMedia.website, 
      icon: Globe, 
      color: 'bg-gray-600 hover:bg-gray-700' 
    },
  ].filter(link => link.url)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Agency Branding */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PIA</span>
            </div>
            <span className="text-gray-800 font-semibold">Pontotoc Insurance Agency</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6"
        >
          {/* Profile Image */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16 pb-6 px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h1>
            <p className="text-lg text-blue-600 font-medium mb-3">{member.title}</p>
            
            {/* Experience Badge */}
            {member.yearsExperience > 0 && (
              <div className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Clock size={14} />
                <span>{member.yearsExperience}+ years experience</span>
              </div>
            )}

            <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>

            {/* Specialties */}
            {member.specialties.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Licenses */}
            {member.licenses.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Licenses</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.licenses.map((license, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                    >
                      <Award size={12} />
                      <span>{license}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{member.phone}</p>
                </div>
              </a>
            )}

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{member.email}</p>
                </div>
              </a>
            )}

            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">Pontotoc, MS</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Media */}
        {socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Connect With Me</h2>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 p-3 rounded-xl text-white ${link.color} transition-colors`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-3"
        >
          <button
            onClick={handleVCardDownload}
            disabled={isVCardDownloading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>{isVCardDownloading ? 'Downloading...' : 'Download vCard'}</span>
          </button>

          <button
            onClick={handleShare}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <Share2 className="w-5 h-5" />
            <span>Share Profile</span>
          </button>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by Pontotoc Insurance Agency</p>
          <p className="mt-1">Your trusted insurance partner</p>
        </div>
      </div>
    </div>
  )
}

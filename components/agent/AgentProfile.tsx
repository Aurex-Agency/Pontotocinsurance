'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
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

// TikTok icon component since it's not available in lucide-react
const TikTok = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

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
    tiktok?: string
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
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
    },
    { 
      name: 'TikTok', 
      url: member.socialMedia.tiktok, 
      icon: TikTok, 
      color: 'bg-black hover:bg-gray-800' 
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
      <div className="max-w-md mx-auto px-4 py-6 md:max-w-4xl lg:max-w-6xl">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6"
        >
          {/* Desktop Layout */}
          <div className="hidden md:flex">
            {/* Left Side - Image and Basic Info */}
            <div className="w-1/3 bg-gradient-to-br from-primary-600 to-primary-700 p-8 flex flex-col items-center justify-center text-white">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-6 relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    console.error('Desktop image failed to load:', member.image, e)
                  }}
                  onLoad={() => {
                    console.log('Desktop image loaded successfully:', member.image)
                  }}
                />
              </div>
              <h1 className="text-2xl font-bold mb-2">{member.name}</h1>
              <p className="text-lg text-primary-100 mb-4">{member.title}</p>
              {member.yearsExperience > 0 && (
                <div className="inline-flex items-center space-x-1 bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Clock size={14} />
                  <span>{member.yearsExperience}+ years experience</span>
                </div>
              )}
            </div>

            {/* Right Side - Bio and Details */}
            <div className="w-2/3 p-8">
              <p className="text-gray-600 text-base leading-relaxed mb-6">{member.bio}</p>

              {/* Specialties */}
              {member.specialties.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
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
                  <div className="flex flex-wrap gap-2">
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
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Profile Image */}
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-700"></div>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      console.error('Mobile image failed to load:', member.image, e)
                    }}
                    onLoad={() => {
                      console.log('Mobile image loaded successfully:', member.image)
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16 pb-6 px-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h1>
              <p className="text-lg text-primary-600 font-medium mb-3">{member.title}</p>
              
              {/* Experience Badge */}
              {member.yearsExperience > 0 && (
                <div className="inline-flex items-center space-x-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
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
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
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
          </div>
        </motion.div>

        {/* Contact Information & Social Media - Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
            
            <div className="space-y-4">
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-600" />
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
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{member.email}</p>
                  </div>
                </a>
              )}

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-600" />
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
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Connect With Me</h2>
              <div className="grid grid-cols-1 gap-3">
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
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
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
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-600" />
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
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{member.email}</p>
                  </div>
                </a>
              )}

              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-600" />
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
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <button
            onClick={handleVCardDownload}
            disabled={isVCardDownloading}
            className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>{isVCardDownloading ? 'Downloading...' : 'Download vCard'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 bg-white text-primary-600 font-semibold py-4 px-6 rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors duration-200 flex items-center justify-center space-x-2"
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
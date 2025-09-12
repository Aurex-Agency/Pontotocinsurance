'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Mail, Phone, Linkedin, Facebook, Award, Clock, Shield, CheckCircle } from 'lucide-react'

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

interface TeamMemberModalProps {
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void
}

const TeamMemberModal = ({ member, isOpen, onClose }: TeamMemberModalProps) => {
  if (!member) return null

  return (
    <AnimatePresence>
      {isOpen && (
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
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <div className="h-64 md:h-80 w-full overflow-hidden rounded-t-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {member.name}
                </h2>
                <p className="text-xl opacity-90">
                  {member.title}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Experience & Licenses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Clock size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Experience</h3>
                    <p className="text-gray-600">{member.yearsExperience}+ years in insurance</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Award size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Licenses</h3>
                    <p className="text-gray-600">{member.licenses.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {member.name.split(' ')[0]}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail size={20} className="text-primary-600" />
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone size={20} className="text-primary-600" />
                      <a
                        href={`tel:${member.phone}`}
                        className="text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                {(member.socialMedia.linkedin || member.socialMedia.facebook) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
                    <div className="flex space-x-4">
                      {member.socialMedia.linkedin && (
                        <a
                          href={member.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                        >
                          <Linkedin size={20} />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {member.socialMedia.facebook && (
                        <a
                          href={member.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                        >
                          <Facebook size={20} />
                          <span>Facebook</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Call to Action */}
              <div className="bg-primary-50 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready to work with {member.name.split(' ')[0]}?
                </h3>
                <p className="text-gray-600 mb-4">
                  Get a personalized quote and expert advice for your insurance needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`mailto:${member.email}`}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Send Email
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="bg-white hover:bg-gray-50 text-primary-600 font-semibold py-3 px-6 rounded-lg border-2 border-primary-600 transition-colors duration-200"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TeamMemberModal

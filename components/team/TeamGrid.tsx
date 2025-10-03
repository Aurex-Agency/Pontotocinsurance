'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, Linkedin, Facebook, Award, Clock, Shield, ExternalLink } from 'lucide-react'

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

interface TeamData {
  teamMembers: TeamMember[]
  settings: {
    showSocialMedia: boolean
    showContactInfo: boolean
    showSpecialties: boolean
    showExperience: boolean
    gridColumns: number
    enableDragDrop: boolean
  }
}

const TeamGrid = () => {
  const [teamData, setTeamData] = useState<TeamData | null>(null)

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        console.log('Fetching team data...')
        const response = await fetch('/api/team')
        console.log('Response status:', response.status)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log('Team data received:', data)
        console.log('Team members count:', data.teamMembers?.length)
        console.log('First team member:', data.teamMembers?.[0])
        setTeamData(data)
      } catch (error) {
        console.error('Error fetching team data:', error)
        // Set a fallback data structure to prevent infinite loading
        setTeamData({
          teamMembers: [],
          settings: {
            showSocialMedia: true,
            showContactInfo: true,
            showSpecialties: true,
            showExperience: true,
            gridColumns: 3,
            enableDragDrop: false
          }
        })
      }
    }

    fetchTeamData()
  }, [])

  if (!teamData) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    )
  }

  const activeMembers = teamData.teamMembers
    .filter(member => member.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder)

  // If no team members, show a message
  if (activeMembers.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Insurance Experts
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              No team members available at this time. Please check back later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Insurance Experts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get to know the dedicated professionals who will help you find the perfect insurance coverage.
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${teamData.settings.gridColumns} gap-8`}>
          {activeMembers.map((member, index) => (
            <Link
              key={member.id}
              href={`/agent/${member.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
              >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Image failed to load:', member.image, e)
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', member.image)
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-3">
                  {member.title}
                </p>

                {/* Experience Badge */}
                {teamData.settings.showExperience && (
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Clock size={16} className="mr-1" />
                    <span>{member.yearsExperience}+ years experience</span>
                  </div>
                )}

                {/* Bio Preview */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Specialties */}
                {teamData.settings.showSpecialties && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.slice(0, 3).map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {member.specialties.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{member.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                {teamData.settings.showContactInfo && (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={16} className="mr-2" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={16} className="mr-2" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                )}

                {/* Social Media */}
                {teamData.settings.showSocialMedia && (
                  <div className="flex space-x-3">
                    {member.socialMedia.linkedin && (
                      <a
                        href={member.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin size={20} />
                      </a>
                    )}
                    {member.socialMedia.facebook && (
                      <a
                        href={member.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Facebook size={20} />
                      </a>
                    )}
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors">
                      View Profile →
                    </span>
                  </div>
                </div>
              </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamGrid

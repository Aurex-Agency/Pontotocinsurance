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

// Static team data - this will work immediately without client-side JavaScript
const staticTeamData = {
  teamMembers: [
    {
      id: "1",
      name: "Justin Stark",
      title: "Senior Insurance Agent",
      bio: "Justin brings over 8 years of experience in insurance and is dedicated to finding the best coverage solutions for our clients.",
      image: "/team/default-avatar.jpg",
      email: "justin@pontotocinsuranceagency.com",
      phone: "(662) 200-2249",
      specialties: ["Auto Insurance", "Home Insurance", "Life Insurance"],
      licenses: ["Property & Casualty", "Life & Health"],
      yearsExperience: 8,
      displayOrder: 1,
      isActive: true,
      socialMedia: {
        linkedin: "https://linkedin.com/in/justin-stark",
        facebook: "https://facebook.com/justin.stark"
      }
    },
    {
      id: "2", 
      name: "Brandon Gonzales",
      title: "Insurance Specialist",
      bio: "Brandon specializes in commercial insurance and helps businesses protect their assets with comprehensive coverage options.",
      image: "/team/default-avatar.jpg",
      email: "brandon@pontotocinsuranceagency.com",
      phone: "(662) 200-2249",
      specialties: ["Commercial Insurance", "Business Insurance", "Workers Compensation"],
      licenses: ["Property & Casualty"],
      yearsExperience: 5,
      displayOrder: 2,
      isActive: true,
      socialMedia: {
        linkedin: "https://linkedin.com/in/brandon-gonzales"
      }
    },
    {
      id: "3",
      name: "Jake Wingo", 
      title: "Insurance Advisor",
      bio: "Jake focuses on personal insurance needs and helps individuals and families secure the protection they need for life's uncertainties.",
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", // Small placeholder
      email: "jake@pontotocinsuranceagency.com",
      phone: "(662) 200-2249", 
      specialties: ["Personal Insurance", "Health Insurance", "Medicare"],
      licenses: ["Life & Health"],
      yearsExperience: 6,
      displayOrder: 3,
      isActive: true,
      socialMedia: {
        facebook: "https://facebook.com/jake.wingo"
      }
    },
    {
      id: "4",
      name: "Dalton Bryant",
      title: "Insurance Consultant", 
      bio: "Dalton provides expert guidance on retirement planning and helps clients prepare for their financial future with confidence.",
      image: "/team/default-avatar.jpg",
      email: "dalton@pontotocinsuranceagency.com",
      phone: "(662) 200-2249",
      specialties: ["Retirement Planning", "Annuities", "Investment Planning"],
      licenses: ["Life & Health", "Securities"],
      yearsExperience: 7,
      displayOrder: 4,
      isActive: true,
      socialMedia: {
        linkedin: "https://linkedin.com/in/dalton-bryant"
      }
    }
  ],
  settings: {
    showSocialMedia: true,
    showContactInfo: true,
    showSpecialties: true,
    showExperience: true,
    gridColumns: 2,
    enableDragDrop: false
  }
}

const StaticTeamGrid = () => {
  const activeMembers = staticTeamData.teamMembers
    .filter(member => member.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Insurance Experts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get to know the dedicated professionals who will help you find the perfect insurance coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {activeMembers.map((member, index) => (
            <Link
              key={member.id}
              href={`/agent/${member.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="block"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                  {staticTeamData.settings.showExperience && (
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
                  {staticTeamData.settings.showSpecialties && (
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
                  {staticTeamData.settings.showContactInfo && (
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
                  {staticTeamData.settings.showSocialMedia && (
                    <div className="flex space-x-3">
                      {member.socialMedia.linkedin && (
                        <a
                          href={member.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 transition-colors"
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StaticTeamGrid

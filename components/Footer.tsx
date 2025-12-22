'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Shield } from 'lucide-react'
import { useSiteSettings } from '../lib/useSiteSettings'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { getPhone, getEmail, getAddress, getName, getHours, isLoading } = useSiteSettings()

  const services = [
    { name: 'Life Insurance', href: '/life' },
    { name: 'Health Insurance', href: '/health' },
    { name: 'Medicare', href: '/medicare' },
    { name: 'Retirement Planning', href: '/retirement' },
  ]

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Agent Login', href: '/admin/login', isAdmin: true },
  ]

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              {/* Logo Image */}
              <div className="relative h-16 w-auto mb-4 bg-white rounded-lg p-2">
                <Image
                  src="/pia_logo.png"
                  alt="Pontotoc Insurance Agency"
                  fill
                  sizes="(max-width: 768px) 200px, 200px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Expert financial advisors specializing in life insurance, health insurance, Medicare, and retirement planning. 
              Your trusted partner for building wealth and protecting your financial future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-white mt-1" />
                <div>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(isLoading ? 'Loading...' : getAddress())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {isLoading ? (
                      <div>
                        <div>158 MS-15, Suite D</div>
                        <div>Pontotoc MS 38863</div>
                      </div>
                    ) : (() => {
                      const addressParts = getAddress().split(', ')
                      // Format as: "158 MS-15, Suite D" and "Pontotoc MS 38863"
                      const line1 = addressParts[0] + ', ' + addressParts[1] // "158 MS-15, Suite D"
                      const line2 = addressParts[2] + ' ' + addressParts[3] // "Pontotoc MS 38863"
                      return (
                        <div>
                          <div>{line1}</div>
                          <div>{line2}</div>
                        </div>
                      )
                    })()}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-white" />
                <a href={`tel:${isLoading ? '6622002249' : getPhone().replace(/[^\d]/g, '')}`} className="text-gray-400 hover:text-white transition-colors">
                  {isLoading ? '(662) 200-2249' : getPhone()}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                {/* Email icon - updated to white */}
                <Mail size={18} className="text-white" />
                <a href={`mailto:${isLoading ? 'info@pontotocinsuranceagency.com' : getEmail()}`} className="text-gray-400 hover:text-white transition-colors">
                  {isLoading ? 'info@pontotocinsuranceagency.com' : getEmail()}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={18} className="text-white mt-1" />
                <div>
                  <div className="text-gray-400 whitespace-pre-line">
                    {isLoading ? (
                      <>
                        Mon - Fri: 8:00 AM - 6:00 PM<br />
                        Sat: 9:00 AM - 2:00 PM<br />
                        Sun: Closed
                      </>
                    ) : getHours()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} {isLoading ? 'Loading...' : getName()}. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Licensed in Mississippi • Not affiliated with or endorsed by the United States government
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

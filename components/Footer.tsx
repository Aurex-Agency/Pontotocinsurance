import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: 'Home Insurance', href: '/home' },
    { name: 'Auto Insurance', href: '/auto' },
    { name: 'Life Insurance', href: '/life' },
    { name: 'Health Insurance', href: '/health' },
    { name: 'Medicare', href: '/medicare' },
    { name: 'Retirement Planning', href: '/retirement' },
  ]

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
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
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Providing comprehensive insurance solutions with personalized service and local expertise. 
              Your trusted partner for all your insurance needs.
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
                <MapPin size={18} className="text-primary-400 mt-1" />
                <div>
                  <a 
                    href="https://maps.google.com/?q=158+MS-15,+Suite+D,+Pontotoc,+MS+38863"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    158 MS-15, Suite D<br />
                    Pontotoc, MS 38863
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-400" />
                <a href="tel:+16622002249" className="text-gray-400 hover:text-white transition-colors">
                  (662) 200-2249
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-400" />
                <a href="mailto:info@pontotocinsuranceagency.com" className="text-gray-400 hover:text-white transition-colors">
                  info@pontotocinsuranceagency.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={18} className="text-primary-400 mt-1" />
                <div>
                  <p className="text-gray-400">
                    Mon - Fri: 8:00 AM - 6:00 PM<br />
                    Sat: 9:00 AM - 2:00 PM<br />
                    Sun: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Pontotoc Insurance Agency. All rights reserved.
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

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import QuoteModal from './QuoteModal'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  const navigation = [
    { name: 'Life', href: '/life' },
    { name: 'Health', href: '/health' },
    { name: 'Medicare', href: '/medicare' },
    { name: 'Retirement', href: '/retirement' },
    { name: 'Home', href: '/home' },
    { name: 'Auto', href: '/auto' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-secondary-900 text-white py-2">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone size={16} />
                <span>(662) 200-2249</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail size={16} />
                <span>info@pontotocinsuranceagency.com</span>
              </div>
            </div>
            <div className="text-sm">
              158 MS-15, Suite D, Pontotoc, MS 38863
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/pia_logo.png"
              alt="Pontotoc Insurance Agency"
              width={200}
              height={64}
              className="h-16 w-auto object-contain"
              priority
              sizes="(max-width: 768px) 150px, 200px"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-secondary-900 hover:bg-secondary-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Get Quote
                </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-secondary-900 hover:bg-secondary-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full mt-4"
              >
                Get Quote
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </header>
  )
}

export default Header

'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react'
import BookingModal from './BookingModal'

const ContactInfo = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone size={24} className="text-primary-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
              <a 
                href="tel:+16622002249" 
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                (662) 200-2249
              </a>
              <p className="text-sm text-gray-500">Available Mon-Fri: 8:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail size={24} className="text-primary-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
              <a 
                href="mailto:info@pontotocinsuranceagency.com" 
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                info@pontotocinsuranceagency.com
              </a>
              <p className="text-sm text-gray-500">We respond within 2 hours</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin size={24} className="text-primary-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
              <a 
                href="https://maps.google.com/?q=158+MS-15,+Suite+D,+Pontotoc,+MS+38863"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 block"
              >
                <span className="block">158 MS-15, Suite D</span>
                <span className="block">Pontotoc, MS 38863</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock size={24} className="text-primary-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Office Hours</h4>
              <div className="text-gray-600 space-y-1">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
        
        <div className="space-y-4">
          <button 
            onClick={() => window.location.href = '/#quote-form'}
            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-colors duration-200 flex items-center space-x-3"
          >
            <MessageCircle size={24} />
            <div className="text-left">
              <div className="font-semibold">Get Instant Quote</div>
              <div className="text-sm text-primary-100">Start your quote online</div>
            </div>
          </button>

          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-colors duration-200 flex items-center space-x-3"
          >
            <Calendar size={24} />
            <div className="text-left">
              <div className="font-semibold">Schedule Consultation</div>
              <div className="text-sm text-primary-100">Meet with our experts</div>
            </div>
          </button>

          <a 
            href="tel:+16622002249"
            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-colors duration-200 flex items-center space-x-3"
          >
            <Phone size={24} />
            <div className="text-left">
              <div className="font-semibold">Call Now</div>
              <div className="text-sm text-primary-100">Speak with an agent</div>
            </div>
          </a>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-red-900 mb-2">Claims Emergency?</h4>
        <p className="text-red-700 mb-4">
          If you need to file a claim outside of business hours, please call your carrier's 24/7 claims hotline.
        </p>
        <p className="text-sm text-red-600">
          For non-emergency claims, you can reach us during business hours or use our online claim forms.
        </p>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  )
}

export default ContactInfo

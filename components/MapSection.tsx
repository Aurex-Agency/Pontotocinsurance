'use client'

import { useState } from 'react'
import BookingModal from './BookingModal'
import { useSiteSettings } from '@/lib/useSiteSettings'

const MapSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const { getAddress, isLoading } = useSiteSettings()
  
  // Default address fallback
  const defaultAddress = '158 MS-15, Suite D, Pontotoc, MS 38863'
  const address = isLoading ? defaultAddress : getAddress()
  const encodedAddress = encodeURIComponent(address)
  return (
    <section className="bg-gray-100">
      <div className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Located in the heart of Pontotoc, Mississippi, our office provides a welcoming environment 
            for all your insurance needs. Walk-ins are welcome during business hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Google Map Embed */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-96">
            <iframe
              src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Pontotoc Insurance Agency Location - ${address}`}
              className="w-full h-full"
            />
          </div>

          {/* Office Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Office Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Free Parking</h4>
                    <p className="text-gray-600">Convenient parking available directly in front of our building.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Wheelchair Accessible</h4>
                    <p className="text-gray-600">Our office is fully accessible with ramps and wide doorways.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Comfortable Waiting Area</h4>
                    <p className="text-gray-600">Relax in our comfortable waiting area with complimentary refreshments.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Private Consultation Rooms</h4>
                    <p className="text-gray-600">Meet with our agents in private, comfortable consultation rooms.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Planning Your Visit?</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Time to Visit</span>
                  <span className="font-semibold text-gray-900">9AM - 11AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Wait Time</span>
                  <span className="font-semibold text-gray-900">5-10 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Appointment Duration</span>
                  <span className="font-semibold text-gray-900">30-45 minutes</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="btn-primary"
              >
                Schedule Appointment
              </button>
              <a 
                href={`https://maps.google.com/?q=${encodedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  )
}

export default MapSection

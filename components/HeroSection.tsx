'use client'

import { useState } from 'react'
import { Shield, Car, Heart, Users, PiggyBank } from 'lucide-react'
import BookingModal from './BookingModal'

const HeroSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    service: ''
  })
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/MCFdomwXH4RRN6HkJgry/webhook-trigger/3433cf41-731f-4a93-9074-2c37e3c9c0a2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          source: 'Hero Section Form',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: ''
        })
      } else {
        setSubmitStatus('error')
        console.error('Webhook submission failed:', response.statusText)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const services = [
    { name: 'Home Insurance', icon: Shield, value: 'home' },
    { name: 'Auto Insurance', icon: Car, value: 'auto' },
    { name: 'Life Insurance', icon: Heart, value: 'life' },
    { name: 'Health Insurance', icon: Users, value: 'health' },
    { name: 'Medicare', icon: Users, value: 'medicare' },
    { name: 'Retirement Planning', icon: PiggyBank, value: 'retirement' },
  ]

  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
      </div>

      <div className="container-custom section-padding relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Pontotoc Insurance Agency
                <span className="block text-primary-200">Your Trusted Partner</span>
              </h1>
              <p className="text-xl text-primary-100 leading-relaxed">
                Comprehensive insurance solutions for Home, Auto, Life, Health, and Retirement Planning. 
                Local expertise with nationwide coverage options.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Free Quote
              </button>
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="border-2 border-secondary-900 text-white hover:bg-secondary-900 hover:text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
              >
                Schedule Consultation
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-400/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-200">500+</div>
                <div className="text-sm text-primary-100">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-200">5+</div>
                <div className="text-sm text-primary-100">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-200">24/7</div>
                <div className="text-sm text-primary-100">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Quote Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Quote</h3>
              <p className="text-primary-100">No obligation, just expert advice</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="">Select Service</option>
                {services.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary-900 hover:bg-secondary-800 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Get My Free Quote</span>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                  <p className="text-sm font-medium">Thank you! Your quote request has been sent successfully. We'll get back to you within 2 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm font-medium">Sorry, there was an error sending your request. Please try again or call us directly at (662) 200-2249.</p>
                </div>
              )}

              <p className="text-xs text-primary-100 text-center">
                By submitting this form, you agree to receive communications from Pontotoc Insurance Agency.
              </p>
            </form>
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

export default HeroSection
'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react'

const ContactCTA = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
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
          message: formData.message,
          source: 'Contact CTA Form',
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
          service: '',
          message: ''
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <section className="section-padding bg-secondary-900 text-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Ready to Protect What Matters Most?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Don't wait until it's too late. Get the insurance coverage you need today with 
              personalized service from your local insurance experts.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="font-semibold">Call Us Today</div>
                  <div className="text-gray-300">(662) 200-2249</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                <div className="font-semibold">Email Us</div>
                <div className="text-gray-300">info@pontotocinsuranceagency.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                <div className="font-semibold">Visit Our Office</div>
                <div className="text-gray-300">158 MS-15, Suite D, Pontotoc, MS 38863</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="font-semibold">Office Hours</div>
                  <div className="text-gray-300">
                    Mon-Fri: 8:00 AM - 6:00 PM<br />
                    Sat: 9:00 AM - 2:00 PM
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Phone size={20} />
                <span>Call Now</span>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-secondary-900 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Schedule Meeting</span>
              </button>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center">Get Your Free Quote</h3>
            
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
                <option value="">Select Service Interest</option>
                <option value="home">Home Insurance</option>
                <option value="auto">Auto Insurance</option>
                <option value="life">Life Insurance</option>
                <option value="health">Health Insurance</option>
                <option value="medicare">Medicare</option>
                <option value="retirement">Retirement Planning</option>
                <option value="all">All Services</option>
              </select>

              <textarea
                name="message"
                placeholder="Tell us about your insurance needs..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary-900 hover:bg-secondary-800 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
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

              <p className="text-xs text-gray-300 text-center">
                By submitting this form, you agree to receive communications from Pontotoc Insurance Agency.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-4">Why Wait? Get Covered Today!</h3>
            <p className="text-primary-100 mb-6 text-lg">
              Join hundreds of satisfied customers who trust Pontotoc Insurance Agency for their insurance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <MessageCircle size={20} />
                <span>Start Online Quote</span>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA

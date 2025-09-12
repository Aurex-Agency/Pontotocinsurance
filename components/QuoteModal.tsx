'use client'

import { useState } from 'react'
import { X, Send, Shield, Car, Heart, Users, PiggyBank, Pill } from 'lucide-react'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  service?: 'home' | 'auto' | 'life' | 'health' | 'medicare' | 'retirement' | 'all'
  title?: string
  description?: string
}

const QuoteModal = ({ 
  isOpen, 
  onClose, 
  service = 'all',
  title = 'Get Your Free Quote',
  description = 'Fill out the form below and we\'ll get back to you within 2 hours.'
}: QuoteModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
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
          zipCode: formData.zipCode,
          message: formData.message,
          service: service,
          source: `Website: ${service.charAt(0).toUpperCase() + service.slice(1)} Quote Modal`,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          zipCode: '',
          message: ''
        })
        // Close modal after 2 seconds on success
        setTimeout(() => {
          onClose()
        }, 2000)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'home': return Shield
      case 'auto': return Car
      case 'life': return Heart
      case 'health': return Users
      case 'medicare': return Pill
      case 'retirement': return PiggyBank
      default: return Shield
    }
  }

  const getServiceName = (service: string) => {
    switch (service) {
      case 'home': return 'Home Insurance'
      case 'auto': return 'Auto Insurance'
      case 'life': return 'Life Insurance'
      case 'health': return 'Health Insurance'
      case 'medicare': return 'Medicare'
      case 'retirement': return 'Retirement Planning'
      case 'all': return 'All Services'
      default: return 'Insurance'
    }
  }

  const ServiceIcon = getServiceIcon(service)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <ServiceIcon size={20} className="text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">{getServiceName(service)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">{description}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />

            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />

            <textarea
              name="message"
              placeholder="Tell us about your insurance needs..."
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Get My Quote</span>
                </>
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

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to receive communications from Pontotoc Insurance Agency.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default QuoteModal

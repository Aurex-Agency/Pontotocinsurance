'use client'

import { useState } from 'react'
import { Award, Clock, Users, Shield, CheckCircle, Phone, Mail } from 'lucide-react'
import BookingModal from '../BookingModal'

interface WhyChooseUsProps {
  service: 'life' | 'health' | 'medicare' | 'retirement'
  title: string
  description: string
}

const WhyChooseUs = ({ service, title, description }: WhyChooseUsProps) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const reasons = [
    {
      icon: Award,
      title: 'Licensed Professionals',
      description: 'Our team consists of licensed insurance professionals with extensive knowledge and experience.'
    },
    {
      icon: Clock,
      title: 'Quick Response Time',
      description: 'We understand urgency. Our team responds quickly to your inquiries and claims.'
    },
    {
      icon: Users,
      title: 'Personal Service',
      description: 'Unlike big companies, we provide personalized service with local expertise.'
    },
    {
      icon: Shield,
      title: 'Multiple Carrier Options',
      description: 'We work with multiple insurance carriers to find you the best rates and coverage.'
    }
  ]

  const serviceSpecificBenefits = {
    life: [
      'Term and permanent life insurance options',
      'No medical exam policies available',
      'Convertible term policies',
      'Cash value accumulation options',
      'Beneficiary change flexibility',
      'Accelerated death benefit riders'
    ],
    health: [
      'Individual and family health plans',
      'Short-term health insurance',
      'Health savings account options',
      'Preventive care benefits',
      'Mental health and substance abuse coverage',
      'Family coverage options'
    ],
    medicare: [
      'Medicare eligibility and enrollment guidance',
      'Original Medicare vs Medicare Advantage comparison',
      'Medigap plan selection and pricing',
      'Prescription drug plan optimization',
      'Annual enrollment period support',
      'Claims assistance and advocacy'
    ],
    retirement: [
      '401(k) optimization strategies',
      'IRA rollover and management',
      'Annuity planning and selection',
      'Social Security optimization',
      'Tax-efficient investment strategies',
      'Estate planning coordination'
    ]
  }

  const benefits = serviceSpecificBenefits[service]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Pontotoc Insurance Agency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <reason.icon size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{reason.title}</h4>
                    <p className="text-gray-600">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Service-Specific Benefits</h4>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-primary-100 mb-6 text-lg">
                Contact us today for a free consultation and personalized quote. 
                Let us help you find the perfect coverage for your needs.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Phone size={20} />
                  <span>(662) 200-2249</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={20} />
                  <span>info@pontotocinsuranceagency.com</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
                Get Free Quote
              </button>
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
              >
                Schedule Consultation
              </button>
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

export default WhyChooseUs

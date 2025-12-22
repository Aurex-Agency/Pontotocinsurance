'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Users, PiggyBank, ArrowRight, Pill } from 'lucide-react'
import QuoteModal from './QuoteModal'

const ServicesOverview = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const services = [
    {
      icon: Heart,
      title: 'Life Insurance',
      description: 'Secure your family\'s financial future with comprehensive life insurance solutions. Protect your loved ones with term, whole, and universal life policies tailored to your needs.',
      features: ['Term Life Insurance', 'Whole Life Insurance', 'Universal Life Insurance', 'Final Expense Coverage', 'Estate Planning'],
      href: '/life',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Health Insurance',
      description: 'Expert guidance through the complex health insurance marketplace. Find affordable individual, family, and group health plans with comprehensive coverage options.',
      features: ['Individual Health Plans', 'Family Coverage', 'Health Savings Accounts (HSA)', 'Short-term Coverage', 'Group Health Plans'],
      href: '/health',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: PiggyBank,
      title: 'Retirement Planning',
      description: 'Build wealth and secure your retirement with comprehensive financial planning. Expert guidance on 401(k), IRAs, annuities, and investment strategies for long-term financial security.',
      features: ['401(k) Planning & Rollovers', 'IRA Management', 'Annuities', 'Social Security Optimization', 'Investment Strategies'],
      href: '/retirement',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Pill,
      title: 'Medicare',
      description: 'Comprehensive Medicare coverage including Parts A, B, C, D, and Medigap plans for seniors.',
      features: ['Original Medicare', 'Medicare Advantage', 'Medigap Plans', 'Prescription Drug Plans'],
      href: '/medicare',
      color: 'from-indigo-500 to-indigo-600'
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Financial & Insurance Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert guidance for your most important financial decisions. From protecting your family's future with life insurance to securing your health coverage and building wealth through retirement planning, we're your trusted financial partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={service.title} href={service.href} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Icon Header */}
                <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                  <div className="flex items-center justify-between">
                    <service.icon size={48} className="text-white" />
                    <ArrowRight size={24} className="text-white/70 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                  <h3 className="text-2xl font-bold mt-4">{service.title}</h3>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`}></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                      Learn More
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Multiple Types of Coverage?
            </h3>
            <p className="text-gray-600 mb-6">
              Bundle your insurance policies and save money while simplifying your coverage management.
            </p>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="btn-primary"
              >
                Get Bundle Quote
              </button>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        service="all"
        title="Get Your Bundle Quote"
        description="Get quotes for multiple insurance types and save with our bundle discounts."
      />
    </section>
  )
}

export default ServicesOverview

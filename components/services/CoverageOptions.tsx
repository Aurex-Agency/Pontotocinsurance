'use client'

import { useState } from 'react'
import { Shield, Car, Heart, Users, PiggyBank, CheckCircle, Pill } from 'lucide-react'
import QuoteModal from '../QuoteModal'
import BookingModal from '../BookingModal'

interface CoverageOptionsProps {
  service: 'home' | 'auto' | 'life' | 'health' | 'medicare' | 'retirement'
  title: string
  description: string
}

const CoverageOptions = ({ service, title, description }: CoverageOptionsProps) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const coverageData = {
    home: {
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      coverages: [
        {
          title: 'Dwelling Coverage',
          description: 'Protects the structure of your home, including walls, roof, and built-in appliances.',
          features: ['Replacement cost coverage', 'Extended replacement cost', 'Ordinance or law coverage']
        },
        {
          title: 'Personal Property',
          description: 'Covers your belongings inside your home and anywhere in the world.',
          features: ['Scheduled personal property', 'Replacement cost coverage', 'Off-premises coverage']
        },
        {
          title: 'Liability Protection',
          description: 'Protects you if someone is injured on your property or you damage someone else\'s property.',
          features: ['Personal liability', 'Medical payments', 'Guest medical protection']
        },
        {
          title: 'Additional Living Expenses',
          description: 'Covers extra costs if you need to live elsewhere while your home is being repaired.',
          features: ['Temporary housing', 'Meal expenses', 'Storage costs']
        }
      ]
    },
    auto: {
      icon: Car,
      color: 'from-green-500 to-green-600',
      coverages: [
        {
          title: 'Liability Coverage',
          description: 'Covers damage you cause to others in an accident.',
          features: ['Bodily injury liability', 'Property damage liability', 'Split limits coverage']
        },
        {
          title: 'Collision Coverage',
          description: 'Pays for damage to your car from collisions with other vehicles or objects.',
          features: ['Deductible options', 'Rental car coverage', 'Glass coverage']
        },
        {
          title: 'Comprehensive Coverage',
          description: 'Protects against non-collision damage like theft, vandalism, and weather.',
          features: ['Theft protection', 'Vandalism coverage', 'Weather damage']
        },
        {
          title: 'Uninsured/Underinsured Motorist',
          description: 'Protects you if you\'re hit by someone with little or no insurance.',
          features: ['Uninsured motorist', 'Underinsured motorist', 'Hit-and-run coverage']
        }
      ]
    },
    life: {
      icon: Heart,
      color: 'from-red-500 to-red-600',
      coverages: [
        {
          title: 'Term Life Insurance',
          description: 'Affordable coverage for a specific period, perfect for young families.',
          features: ['Level premiums', 'Convertible options', 'Renewable terms']
        },
        {
          title: 'Whole Life Insurance',
          description: 'Permanent coverage that builds cash value over time.',
          features: ['Cash value growth', 'Guaranteed premiums', 'Dividend potential']
        },
        {
          title: 'Universal Life Insurance',
          description: 'Flexible permanent coverage with adjustable premiums and death benefits.',
          features: ['Premium flexibility', 'Cash value options', 'Death benefit flexibility']
        },
        {
          title: 'Final Expense Insurance',
          description: 'Smaller policies designed to cover funeral and burial expenses.',
          features: ['Simplified underwriting', 'Guaranteed acceptance', 'Quick approval']
        }
      ]
    },
    health: {
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      coverages: [
        {
          title: 'Individual Health Plans',
          description: 'Comprehensive health coverage for individuals and families.',
          features: ['Preventive care', 'Prescription coverage', 'Mental health services']
        },
        {
          title: 'Short-Term Health Insurance',
          description: 'Temporary coverage for life transitions.',
          features: ['Quick approval', 'Flexible terms', 'Affordable premiums']
        },
        {
          title: 'Health Savings Accounts',
          description: 'Tax-advantaged savings accounts for healthcare expenses.',
          features: ['Tax deductions', 'Tax-free growth', 'Portable accounts']
        },
        {
          title: 'Family Coverage',
          description: 'Comprehensive coverage for families with children.',
          features: ['Pediatric care', 'Maternity coverage', 'Family deductibles']
        }
      ]
    },
    medicare: {
      icon: Pill,
      color: 'from-indigo-500 to-indigo-600',
      coverages: [
        {
          title: 'Original Medicare (Parts A & B)',
          description: 'Hospital insurance and medical insurance coverage.',
          features: ['Hospital stays', 'Doctor visits', 'Outpatient care', 'Preventive services']
        },
        {
          title: 'Medicare Advantage (Part C)',
          description: 'All-in-one alternative to Original Medicare.',
          features: ['All Original Medicare benefits', 'Additional benefits', 'Prescription drug coverage', 'Vision and dental']
        },
        {
          title: 'Medicare Supplement (Medigap)',
          description: 'Additional coverage for Original Medicare.',
          features: ['Out-of-pocket costs', 'Deductibles and coinsurance', 'Foreign travel emergency', 'Excess charges']
        },
        {
          title: 'Prescription Drug Plans (Part D)',
          description: 'Standalone prescription drug coverage.',
          features: ['Generic and brand-name drugs', 'Mail-order pharmacy', 'Preferred pharmacy networks', 'Catastrophic coverage']
        }
      ]
    },
    retirement: {
      icon: PiggyBank,
      color: 'from-yellow-500 to-yellow-600',
      coverages: [
        {
          title: '401(k) Planning',
          description: 'Maximize your employer-sponsored retirement savings.',
          features: ['Contribution optimization', 'Investment selection', 'Rollover guidance']
        },
        {
          title: 'IRA Management',
          description: 'Individual Retirement Account strategies and management.',
          features: ['Traditional IRAs', 'Roth IRAs', 'SEP IRAs']
        },
        {
          title: 'Annuities',
          description: 'Guaranteed income for retirement through annuity products.',
          features: ['Fixed annuities', 'Variable annuities', 'Immediate annuities']
        },
        {
          title: 'Social Security Optimization',
          description: 'Strategies to maximize your Social Security benefits.',
          features: ['Benefit timing', 'Spousal benefits', 'Survivor benefits']
        }
      ]
    }
  }

  const data = coverageData[service]
  const Icon = data.icon

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className={`w-16 h-16 bg-gradient-to-r ${data.color} rounded-full flex items-center justify-center`}>
              <Icon size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.coverages.map((coverage, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{coverage.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{coverage.description}</p>
              
              <div className="space-y-3">
                {coverage.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Help Choosing Coverage?
              </h3>
              <p className="text-gray-600 mb-6">
                Our experienced agents will help you understand your options and choose the coverage 
                that best fits your needs and budget. We'll explain everything in plain English 
                and make sure you're fully protected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn-primary"
                >
                  Get Free Quote
                </button>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="btn-secondary"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Savings</span>
                  <span className="font-semibold text-gray-900">$300+/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coverage Options</span>
                  <span className="font-semibold text-gray-900">Multiple Carriers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Claims Support</span>
                  <span className="font-semibold text-gray-900">24/7 Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Local Service</span>
                  <span className="font-semibold text-gray-900">Pontotoc, MS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        service={service}
        title={`Get Your ${title} Quote`}
        description={`Get a personalized quote for ${title.toLowerCase()} coverage.`}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  )
}

export default CoverageOptions

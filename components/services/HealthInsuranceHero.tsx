'use client'

import { Users, Shield, DollarSign, CheckCircle } from 'lucide-react'

const HealthInsuranceHero = () => {
  const benefits = [
    'Individual and family plans',
    'Medicare supplement coverage',
    'Prescription drug coverage',
    'Preventive care benefits',
    'Mental health services',
    'Emergency coverage'
  ]

  return (
    <section className="relative bg-gradient-to-br from-purple-600 to-purple-800 text-white overflow-hidden">
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
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <Users size={48} className="text-purple-200" />
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold">Health Insurance</h1>
                <p className="text-xl text-purple-100">Your Health, Our Priority</p>
              </div>
            </div>

            <p className="text-xl text-purple-100 leading-relaxed">
              Navigate the complex world of health insurance with confidence. We'll help you find 
              the right coverage for your health needs and budget.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield size={24} className="text-purple-200" />
                  <span className="font-semibold">Individual Plans</span>
                </div>
                <p className="text-purple-100 text-sm">
                  Comprehensive health coverage for individuals and families.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <DollarSign size={24} className="text-purple-200" />
                  <span className="font-semibold">Medicare Supplements</span>
                </div>
                <p className="text-purple-100 text-sm">
                  Additional coverage to fill gaps in Original Medicare.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Free Quote
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
                Compare Plans
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center">What's Included</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-purple-200 flex-shrink-0" />
                  <span className="text-purple-100">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-purple-400/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200 mb-2">Open Enrollment</div>
                <div className="text-5xl font-bold text-white mb-2">Now</div>
                <div className="text-purple-100">Open</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HealthInsuranceHero

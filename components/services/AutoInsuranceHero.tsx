'use client'

import { Car, Shield, DollarSign, CheckCircle } from 'lucide-react'

const AutoInsuranceHero = () => {
  const benefits = [
    'Comprehensive liability coverage',
    'Collision and comprehensive protection',
    'Uninsured motorist coverage',
    'Roadside assistance',
    'Rental car reimbursement',
    'Multi-vehicle discounts'
  ]

  return (
    <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white overflow-hidden">
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
            <div className="flex items-center space-x-3 mb-6">
              <Car size={48} className="text-green-200" />
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold">Auto Insurance</h1>
                <p className="text-xl text-green-100">Drive with Confidence</p>
              </div>
            </div>

            <p className="text-xl text-green-100 leading-relaxed">
              Protect yourself and your vehicle with comprehensive auto insurance coverage. 
              We work with multiple carriers to find you the best rates and coverage options.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield size={24} className="text-green-200" />
                  <span className="font-semibold">Liability Coverage</span>
                </div>
                <p className="text-green-100 text-sm">
                  Required coverage that protects you if you cause damage to others.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <DollarSign size={24} className="text-green-200" />
                  <span className="font-semibold">Comprehensive Coverage</span>
                </div>
                <p className="text-green-100 text-sm">
                  Protection against theft, vandalism, and weather damage.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Free Quote
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
                Compare Rates
              </button>
            </div>
          </div>

          {/* Right Content - Benefits List */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center">What's Included</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-200 flex-shrink-0" />
                  <span className="text-green-100">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-green-400/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200 mb-2">Save Up To</div>
                <div className="text-5xl font-bold text-white mb-2">30%</div>
                <div className="text-green-100">With Multi-Car Discounts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AutoInsuranceHero

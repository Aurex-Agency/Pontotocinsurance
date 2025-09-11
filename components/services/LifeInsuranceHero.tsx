'use client'

import { Heart, Shield, DollarSign, CheckCircle } from 'lucide-react'

const LifeInsuranceHero = () => {
  const benefits = [
    'Financial protection for your family',
    'Tax-free death benefits',
    'Cash value accumulation',
    'Flexible premium options',
    'Convertible term policies',
    'Guaranteed insurability'
  ]

  return (
    <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white overflow-hidden">
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
              <Heart size={48} className="text-red-200" />
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold">Life Insurance</h1>
                <p className="text-xl text-red-100">Secure Your Family's Future</p>
              </div>
            </div>

            <p className="text-xl text-red-100 leading-relaxed">
              Protect your loved ones with life insurance that provides financial security and peace of mind. 
              We'll help you choose the right coverage for your family's needs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield size={24} className="text-red-200" />
                  <span className="font-semibold">Term Life</span>
                </div>
                <p className="text-red-100 text-sm">
                  Affordable coverage for a specific period, perfect for young families.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <DollarSign size={24} className="text-red-200" />
                  <span className="font-semibold">Permanent Life</span>
                </div>
                <p className="text-red-100 text-sm">
                  Lifetime coverage with cash value accumulation and investment options.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Free Quote
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
                Calculate Needs
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center">What's Included</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-red-200 flex-shrink-0" />
                  <span className="text-red-100">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-red-400/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-200 mb-2">Starting At</div>
                <div className="text-5xl font-bold text-white mb-2">$15</div>
                <div className="text-red-100">Per Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LifeInsuranceHero

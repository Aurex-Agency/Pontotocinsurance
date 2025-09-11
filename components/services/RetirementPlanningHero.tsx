'use client'

import { PiggyBank, DollarSign, TrendingUp, CheckCircle } from 'lucide-react'

const RetirementPlanningHero = () => {
  const benefits = [
    '401(k) optimization strategies',
    'IRA management and rollovers',
    'Annuity planning and selection',
    'Social Security optimization',
    'Tax-efficient investing',
    'Estate planning coordination'
  ]

  return (
    <section className="relative bg-gradient-to-br from-yellow-600 to-yellow-800 text-white overflow-hidden">
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
              <PiggyBank size={48} className="text-yellow-200" />
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold">Retirement Planning</h1>
                <p className="text-xl text-yellow-100">Secure Your Golden Years</p>
              </div>
            </div>

            <p className="text-xl text-yellow-100 leading-relaxed">
              Build a secure retirement with comprehensive planning services. We'll help you maximize 
              your savings and create a strategy for your financial future.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <DollarSign size={24} className="text-yellow-200" />
                  <span className="font-semibold">401(k) Planning</span>
                </div>
                <p className="text-yellow-100 text-sm">
                  Maximize your employer-sponsored retirement savings.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <TrendingUp size={24} className="text-yellow-200" />
                  <span className="font-semibold">Investment Strategy</span>
                </div>
                <p className="text-yellow-100 text-sm">
                  Diversified portfolio management for long-term growth.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-yellow-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Start Planning
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-yellow-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
                Free Consultation
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center">What's Included</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-yellow-200 flex-shrink-0" />
                  <span className="text-yellow-100">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-yellow-400/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-200 mb-2">Start Early</div>
                <div className="text-5xl font-bold text-white mb-2">Save More</div>
                <div className="text-yellow-100">Retire Comfortably</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RetirementPlanningHero

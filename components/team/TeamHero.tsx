'use client'

import { Users, Award, Shield, Heart } from 'lucide-react'

const TeamHero = () => {
  const stats = [
    { icon: Users, label: 'Team Members', value: '3+' },
    { icon: Award, label: 'Years Combined', value: '19+' },
    { icon: Shield, label: 'Licenses', value: '8+' },
    { icon: Heart, label: 'Happy Clients', value: '500+' }
  ]

  return (
    <section className="gradient-bg py-20">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Meet Our <span className="text-primary-600">Expert Team</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our experienced insurance professionals are dedicated to finding the perfect coverage 
              for your unique needs. With years of local expertise and a commitment to personalized service, 
              we're here to protect what matters most to you.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                      <Icon size={24} className="text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamHero

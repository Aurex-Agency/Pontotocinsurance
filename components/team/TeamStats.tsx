'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Star, Clock, Shield } from 'lucide-react'

const TeamStats = () => {
  const features = [
    {
      icon: CheckCircle,
      title: 'Licensed Professionals',
      description: 'All team members are fully licensed and certified in Mississippi'
    },
    {
      icon: Star,
      title: '5+ Years Experience',
      description: 'Combined decades of experience in the insurance industry'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'We respond to all inquiries within 2 hours during business hours'
    },
    {
      icon: Shield,
      title: 'Local Expertise',
      description: 'Deep knowledge of Mississippi insurance requirements and regulations'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Team?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team combines years of experience with a genuine commitment to serving our community. 
            We're not just insurance agents – we're your neighbors, friends, and trusted advisors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                  <Icon size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TeamStats

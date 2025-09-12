import Link from 'next/link'
import { Shield, Car, Heart, Users, PiggyBank, ArrowRight, Pill } from 'lucide-react'

const ServicesOverview = () => {
  const services = [
    {
      icon: Shield,
      title: 'Home Insurance',
      description: 'Protect your most valuable asset with comprehensive home insurance coverage tailored to your needs.',
      features: ['Property Protection', 'Liability Coverage', 'Natural Disaster Protection', 'Personal Property Coverage'],
      href: '/home',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Car,
      title: 'Auto Insurance',
      description: 'Get the coverage you need to drive with confidence. Competitive rates and comprehensive protection.',
      features: ['Liability Coverage', 'Collision Protection', 'Comprehensive Coverage', 'Uninsured Motorist'],
      href: '/auto',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Life Insurance',
      description: 'Secure your family\'s future with life insurance plans that provide financial protection when they need it most.',
      features: ['Term Life Insurance', 'Whole Life Insurance', 'Universal Life', 'Final Expense Coverage'],
      href: '/life',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Health Insurance',
      description: 'Navigate the complex world of health insurance with expert guidance and personalized solutions.',
      features: ['Individual Plans', 'Family Coverage', 'Health Savings Accounts', 'Short-term Coverage'],
      href: '/health',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Pill,
      title: 'Medicare',
      description: 'Comprehensive Medicare coverage including Parts A, B, C, D, and Medigap plans for seniors.',
      features: ['Original Medicare', 'Medicare Advantage', 'Medigap Plans', 'Prescription Drug Plans'],
      href: '/medicare',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: PiggyBank,
      title: 'Retirement Planning',
      description: 'Build a secure retirement with comprehensive planning services and investment strategies.',
      features: ['401(k) Planning', 'IRA Management', 'Annuities', 'Social Security Optimization'],
      href: '/retirement',
      color: 'from-yellow-500 to-yellow-600'
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Insurance Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a full range of insurance products to protect what matters most to you. 
            From your home and car to your health and retirement, we've got you covered.
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
                    <a 
                      href={service.href}
                      className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors"
                    >
                      Learn More
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
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
            <a 
              href="/contact" 
              className="btn-primary inline-block"
            >
              Get Bundle Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesOverview

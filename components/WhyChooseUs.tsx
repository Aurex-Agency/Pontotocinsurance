import { Award, Clock, Users, Shield, CheckCircle, Star } from 'lucide-react'

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Award,
      title: 'Licensed Professionals',
      description: 'Our team consists of licensed insurance professionals with extensive knowledge and experience in the industry.'
    },
    {
      icon: Clock,
      title: 'Quick Response Time',
      description: 'We understand that insurance needs can be urgent. Our team responds quickly to your inquiries and claims.'
    },
    {
      icon: Users,
      title: 'Personal Service',
      description: 'Unlike big insurance companies, we provide personalized service with local expertise and face-to-face interactions.'
    },
    {
      icon: Shield,
      title: 'Comprehensive Coverage',
      description: 'We offer a wide range of insurance products to meet all your needs under one roof.'
    }
  ]

  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '24/7', label: 'Claims Support' }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Pontotoc, MS',
      rating: 5,
      text: 'Pontotoc Insurance Agency made finding the right insurance so easy. Their personalized service and local expertise really made a difference.'
    },
    {
      name: 'Michael Davis',
      location: 'Tupelo, MS',
      rating: 5,
      text: 'I\'ve been with them for over 10 years. They always find me the best rates and are there when I need them.'
    },
    {
      name: 'Jennifer Wilson',
      location: 'Oxford, MS',
      rating: 5,
      text: 'When I had a claim, they handled everything professionally and quickly. I couldn\'t be happier with their service.'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Pontotoc Insurance Agency?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another insurance agency. We're your neighbors, committed to providing 
            exceptional service and protecting what matters most to you.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <reason.icon size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Clients Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits List */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                What Sets Us Apart
              </h3>
              <div className="space-y-4">
                {[
                  'Local expertise with nationwide coverage options',
                  'Personal relationships and face-to-face service',
                  'Multiple carrier options for competitive pricing',
                  'Claims advocacy and support',
                  'Regular policy reviews and updates',
                  'Educational resources and guidance',
                  'Flexible payment options',
                  'Community involvement and support'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h4>
              <p className="text-gray-600 mb-6">
                Contact us today for a free consultation and quote. Let us help you find the perfect insurance solution for your needs.
              </p>
              <div className="space-y-3">
                <a 
                  href="/contact" 
                  className="btn-primary w-full inline-block text-center"
                >
                  Get Free Quote
                </a>
                <button 
                  onClick={() => {
                    window.location.href = '/contact#schedule';
                  }}
                  className="btn-secondary w-full"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

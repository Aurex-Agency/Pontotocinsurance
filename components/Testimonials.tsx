'use client'

import { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Robert & Mary Thompson',
      location: 'Pontotoc, MS',
      service: 'Home & Auto Insurance',
      rating: 5,
      text: 'Pontotoc Insurance Agency saved us over $800 per year on our home and auto insurance. Their personalized service and attention to detail is unmatched. When we had a claim after a storm, they handled everything seamlessly.',
      avatar: 'RT'
    },
    {
      name: 'Dr. James Mitchell',
      location: 'Oxford, MS',
      service: 'Life & Health Insurance',
      rating: 5,
      text: 'As a physician, I understand the importance of proper coverage. The team at The Agency Next Door took the time to understand my unique needs and found me comprehensive coverage at an excellent rate.',
      avatar: 'JM'
    },
    {
      name: 'Linda Rodriguez',
      location: 'Tupelo, MS',
      service: 'Medicare & Retirement Planning',
      rating: 5,
      text: 'Navigating Medicare was overwhelming until I found Pontotoc Insurance Agency. They explained everything clearly and helped me choose the right plan. Their ongoing support has been invaluable.',
      avatar: 'LR'
    },
    {
      name: 'David & Jennifer Adams',
      location: 'New Albany, MS',
      service: 'All Insurance Types',
      rating: 5,
      text: 'We\'ve been with Pontotoc Insurance Agency for over 8 years. They handle all our insurance needs - home, auto, life, and health. Their local presence and personal service make all the difference.',
      avatar: 'DA'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentTestimonial]

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience with Pontotoc Insurance Agency.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <Quote size={80} className="text-primary-200 absolute top-8 right-8 opacity-30" />
            
            <div className="relative z-10">
              {/* Testimonial Content */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={24} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  "{current.text}"
                </blockquote>
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {current.avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-lg">{current.name}</div>
                  <div className="text-gray-600">{current.location}</div>
                  <div className="text-primary-600 font-medium">{current.service}</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Trusted by families and businesses throughout North Mississippi</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">24/7</div>
              <div className="text-gray-600">Claims Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

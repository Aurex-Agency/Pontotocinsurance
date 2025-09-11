'use client'

import { useEffect } from 'react'

const Testimonials = () => {
  useEffect(() => {
    // Load the GHL review widget script
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://link.pontotocinsuranceagency.com/reputation/assets/review-widget.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://link.pontotocinsuranceagency.com/reputation/assets/review-widget.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience with Pontotoc Insurance Agency.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* GHL Review Widget */}
            <iframe 
              className="lc_reviews_widget" 
              src="https://link.pontotocinsuranceagency.com/reputation/widgets/review_widget/MCFdomwXH4RRN6HkJgry" 
              frameBorder="0" 
              scrolling="no" 
              style={{ minWidth: '100%', width: '100%', minHeight: '400px' }}
              title="Client Reviews"
            />
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
              <div className="text-3xl font-bold text-primary-600">5+</div>
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

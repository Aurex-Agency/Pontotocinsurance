import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react'

const ContactCTA = () => {
  return (
    <section className="section-padding bg-secondary-900 text-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Ready to Protect What Matters Most?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Don't wait until it's too late. Get the insurance coverage you need today with 
              personalized service from your local insurance experts.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="font-semibold">Call Us Today</div>
                  <div className="text-gray-300">(662) 200-2249</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                <div className="font-semibold">Email Us</div>
                <div className="text-gray-300">info@pontotocinsuranceagency.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                <div className="font-semibold">Visit Our Office</div>
                <div className="text-gray-300">158 MS-15, Suite D, Pontotoc, MS 38863</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="font-semibold">Office Hours</div>
                  <div className="text-gray-300">
                    Mon-Fri: 8:00 AM - 6:00 PM<br />
                    Sat: 9:00 AM - 2:00 PM
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Phone size={20} />
                <span>Call Now</span>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-secondary-900 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Schedule Meeting</span>
              </button>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center">Get Your Free Quote</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />

              <select
                required
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="">Select Service Interest</option>
                <option value="home">Home Insurance</option>
                <option value="auto">Auto Insurance</option>
                <option value="life">Life Insurance</option>
                <option value="health">Health Insurance</option>
                <option value="retirement">Retirement Planning</option>
                <option value="all">All Services</option>
              </select>

              <textarea
                placeholder="Tell us about your insurance needs..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
              >
                Get My Free Quote
              </button>

              <p className="text-xs text-gray-300 text-center">
                By submitting this form, you agree to receive communications from Pontotoc Insurance Agency.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8">
            <h3 className="text-3xl font-bold mb-4">Why Wait? Get Covered Today!</h3>
            <p className="text-primary-100 mb-6 text-lg">
              Join hundreds of satisfied customers who trust Pontotoc Insurance Agency for their insurance needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <MessageCircle size={20} />
                <span>Start Online Quote</span>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA

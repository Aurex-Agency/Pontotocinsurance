import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const ContactHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
      </div>

      <div className="container-custom section-padding relative">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Ready to protect what matters most? Get in touch with our insurance experts for personalized service and competitive rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-primary-100 mb-2">(662) 200-2249</p>
            <p className="text-sm text-primary-200">Available Mon-Fri 8AM-6PM</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-primary-100 mb-2">info@theagencynextdoor.com</p>
            <p className="text-sm text-primary-200">We respond within 2 hours</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-primary-100 mb-2">158 MS-15</p>
            <p className="text-sm text-primary-200">Pontotoc, MS 38863</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
            <p className="text-primary-100 mb-2">Mon-Fri: 8AM-6PM</p>
            <p className="text-sm text-primary-200">Sat: 9AM-2PM</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactHero

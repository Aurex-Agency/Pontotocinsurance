import { Shield, Home, DollarSign, CheckCircle } from 'lucide-react'

const HomeInsuranceHero = () => {
  const benefits = [
    'Comprehensive property protection',
    'Personal liability coverage',
    'Natural disaster protection',
    'Personal belongings coverage',
    'Additional living expenses',
    'Identity theft protection'
  ]

  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
      {/* Background Pattern */}
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
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield size={48} className="text-blue-200" />
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold">Home Insurance</h1>
                <p className="text-xl text-blue-100">Protect Your Most Valuable Asset</p>
              </div>
            </div>

            <p className="text-xl text-blue-100 leading-relaxed">
              Your home is more than just a building – it's where your memories are made and your family grows. 
              Our comprehensive home insurance coverage ensures you're protected against the unexpected.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Home size={24} className="text-blue-200" />
                  <span className="font-semibold">Property Protection</span>
                </div>
                <p className="text-blue-100 text-sm">
                  Coverage for your dwelling, other structures, and personal property.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <DollarSign size={24} className="text-blue-200" />
                  <span className="font-semibold">Liability Coverage</span>
                </div>
                <p className="text-blue-100 text-sm">
                  Protection against lawsuits and medical expenses for guests.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Free Quote
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Benefits List */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center">What's Included</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-blue-200 flex-shrink-0" />
                  <span className="text-blue-100">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-blue-400/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-2">Save Up To</div>
                <div className="text-5xl font-bold text-white mb-2">25%</div>
                <div className="text-blue-100">When You Bundle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeInsuranceHero

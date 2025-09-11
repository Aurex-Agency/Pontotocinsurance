const MapSection = () => {
  return (
    <section className="bg-gray-100">
      <div className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Located in the heart of Pontotoc, Mississippi, our office provides a welcoming environment 
            for all your insurance needs. Walk-ins are welcome during business hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Our Office</h3>
              <p className="text-sm">
                158 MS-15, Suite D, Pontotoc, MS 38863
              </p>
              <a 
                href="https://maps.google.com/?q=158+MS-15,+Suite+D,+Pontotoc,+MS+38863"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-block"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Office Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Office Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Free Parking</h4>
                    <p className="text-gray-600">Convenient parking available directly in front of our building.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Wheelchair Accessible</h4>
                    <p className="text-gray-600">Our office is fully accessible with ramps and wide doorways.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Comfortable Waiting Area</h4>
                    <p className="text-gray-600">Relax in our comfortable waiting area with complimentary refreshments.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Private Consultation Rooms</h4>
                    <p className="text-gray-600">Meet with our agents in private, comfortable consultation rooms.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Planning Your Visit?</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Time to Visit</span>
                  <span className="font-semibold text-gray-900">9AM - 11AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Wait Time</span>
                  <span className="font-semibold text-gray-900">5-10 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Appointment Duration</span>
                  <span className="font-semibold text-gray-900">30-45 minutes</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">
                Schedule Appointment
              </button>
              <a 
                href="https://maps.google.com/?q=158+MS-15,+Suite+D,+Pontotoc,+MS+38863"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection

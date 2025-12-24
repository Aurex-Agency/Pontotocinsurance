import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Pontotoc Insurance Agency',
  description: 'Terms of Service for Pontotoc Insurance Agency. Read our terms and conditions for using our insurance services and website.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'insurance terms',
    'Pontotoc Insurance Agency terms',
    'Mississippi insurance terms',
    'legal terms'
  ],
  openGraph: {
    title: 'Terms of Service - Pontotoc Insurance Agency',
    description: 'Terms of Service for Pontotoc Insurance Agency. Read our terms and conditions for using our insurance services and website.',
    url: 'https://www.pontotocinsuranceagency.com/terms',
  },
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  Welcome to Pontotoc Insurance Agency ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website, services, and any related applications (collectively, the "Service").
                </p>
                <p className="text-gray-700 mb-4">
                  By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  Pontotoc Insurance Agency is a licensed insurance agency providing insurance products and services, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Home insurance</li>
                  <li>Auto insurance</li>
                  <li>Life insurance</li>
                  <li>Health insurance</li>
                  <li>Medicare insurance</li>
                  <li>Retirement planning services</li>
                  <li>Insurance quotes and consultations</li>
                  <li>Claims assistance</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  We act as an independent insurance agency and are not affiliated with any specific insurance carrier. We work with multiple insurance companies to find the best coverage options for our clients.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Eligibility</h2>
                <p className="text-gray-700 mb-4">
                  To use our Service, you must:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into binding agreements</li>
                  <li>Provide accurate and complete information</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  We reserve the right to refuse service to anyone at our sole discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Insurance Products and Services</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Quotes and Applications</h3>
                <p className="text-gray-700 mb-4">
                  All quotes provided are estimates based on the information you provide and are subject to verification by insurance carriers. Final premiums and coverage terms may vary based on underwriting decisions.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Policy Terms</h3>
                <p className="text-gray-700 mb-4">
                  Insurance policies are governed by the terms and conditions set forth in the actual policy documents issued by the insurance carrier. Our role is to facilitate the application process and provide ongoing service.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Coverage Limitations</h3>
                <p className="text-gray-700 mb-4">
                  Coverage is subject to the terms, conditions, and exclusions contained in your insurance policy. We do not guarantee coverage for any specific loss or claim.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Responsibilities</h2>
                <p className="text-gray-700 mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Providing accurate and complete information</li>
                  <li>Updating your information when it changes</li>
                  <li>Paying premiums on time</li>
                  <li>Complying with all policy terms and conditions</li>
                  <li>Notifying us promptly of any changes that may affect your coverage</li>
                  <li>Using our Service in accordance with applicable laws</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Prohibited Uses</h2>
                <p className="text-gray-700 mb-4">
                  You may not use our Service:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>For any obscene or immoral purpose</li>
                  <li>To interfere with or circumvent the security features of the Service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property Rights</h2>
                <p className="text-gray-700 mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Pontotoc Insurance Agency and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
                <p className="text-gray-700 mb-4">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our material without our prior written consent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimers and Limitations of Liability</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.1 No Warranty</h3>
                <p className="text-gray-700 mb-4">
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the Service or the information, content, materials, or products included on the Service.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.2 Limitation of Liability</h3>
                <p className="text-gray-700 mb-4">
                  In no event shall Pontotoc Insurance Agency, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.3 Insurance Disclaimer</h3>
                <p className="text-gray-700 mb-4">
                  We are not responsible for the acts or omissions of insurance carriers, including but not limited to claims handling, coverage decisions, or policy cancellations. Insurance coverage is subject to the terms and conditions of the actual policy issued by the carrier.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
                <p className="text-gray-700 mb-4">
                  You agree to defend, indemnify, and hold harmless Pontotoc Insurance Agency and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
                <p className="text-gray-700 mb-4">
                  We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="text-gray-700 mb-4">
                  Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
                <p className="text-gray-700 mb-4">
                  These Terms shall be interpreted and governed by the laws of the State of Mississippi, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of Mississippi.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p className="text-gray-700 mb-4">
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Severability</h2>
                <p className="text-gray-700 mb-4">
                  If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Entire Agreement</h2>
                <p className="text-gray-700 mb-4">
                  These Terms constitute the sole and entire agreement between you and Pontotoc Insurance Agency with respect to the Service and supersede all prior and contemporaneous understandings, agreements, representations, and warranties.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-2"><strong>Pontotoc Insurance Agency</strong></p>
                  <p className="text-gray-700 mb-2">158 MS-15, Suite D</p>
                  <p className="text-gray-700 mb-2">Pontotoc, MS 38863</p>
                  <p className="text-gray-700 mb-2">Phone: (662) 200-2249</p>
                  <p className="text-gray-700 mb-2">Email: info@pontotocinsuranceagency.com</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

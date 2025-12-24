import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Pontotoc Insurance Agency',
  description: 'Privacy Policy for Pontotoc Insurance Agency. Learn how we collect, use, and protect your personal information.',
  keywords: [
    'privacy policy',
    'data protection',
    'personal information',
    'insurance privacy',
    'Pontotoc Insurance Agency privacy',
    'Mississippi insurance privacy'
  ],
  openGraph: {
    title: 'Privacy Policy - Pontotoc Insurance Agency',
    description: 'Privacy Policy for Pontotoc Insurance Agency. Learn how we collect, use, and protect your personal information.',
    url: 'https://www.pontotocinsuranceagency.com/privacy',
  },
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Pontotoc Insurance Agency ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="text-gray-700 mb-4">
                  By using our website or services, you consent to the data practices described in this Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
                <p className="text-gray-700 mb-4">
                  We may collect personal information that you voluntarily provide to us, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Name and contact information (email address, phone number, mailing address)</li>
                  <li>Insurance-related information (policy details, claims history, coverage needs)</li>
                  <li>Financial information (credit scores, payment information, income details)</li>
                  <li>Demographic information (age, gender, marital status)</li>
                  <li>Employment information (employer, occupation, work address)</li>
                  <li>Vehicle information (make, model, year, VIN, driving record)</li>
                  <li>Property information (home address, property details, value)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
                <p className="text-gray-700 mb-4">
                  We may automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Providing insurance quotes and policy recommendations</li>
                  <li>Processing insurance applications and policy changes</li>
                  <li>Managing your insurance policies and accounts</li>
                  <li>Processing claims and providing customer support</li>
                  <li>Communicating with you about your policies and our services</li>
                  <li>Improving our website and services</li>
                  <li>Complying with legal and regulatory requirements</li>
                  <li>Marketing our products and services (with your consent)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 mb-4">
                  We may share your information in the following circumstances:
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Insurance Carriers</h3>
                <p className="text-gray-700 mb-4">
                  We share your information with insurance carriers to obtain quotes, process applications, and manage your policies.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Service Providers</h3>
                <p className="text-gray-700 mb-4">
                  We may share information with third-party service providers who assist us in operating our business, such as:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Website hosting and maintenance providers</li>
                  <li>Customer relationship management systems</li>
                  <li>Email marketing platforms</li>
                  <li>Payment processing services</li>
                  <li>Analytics and marketing tools</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Legal Requirements</h3>
                <p className="text-gray-700 mb-4">
                  We may disclose your information if required by law or to protect our rights, property, or safety, or that of our customers or others.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
                <p className="text-gray-700 mb-4">
                  We use industry-standard encryption and security protocols to safeguard your data, including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure data storage and backup systems</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication measures</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
                <p className="text-gray-700 mb-4">
                  You have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Opt out of marketing communications</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                </p>
                <p className="text-gray-700 mb-4">
                  Types of cookies we use:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Essential cookies:</strong> Necessary for website functionality</li>
                  <li><strong>Analytics cookies:</strong> Help us understand website usage</li>
                  <li><strong>Marketing cookies:</strong> Used for targeted advertising (with consent)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Links</h2>
                <p className="text-gray-700 mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the updated Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
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

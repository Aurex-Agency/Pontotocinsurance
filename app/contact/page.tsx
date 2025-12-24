import type { Metadata } from 'next'
import ContactHero from '@/components/ContactHero'
import ContactForm from '@/components/ContactForm'
import ContactInfo from '@/components/ContactInfo'
import MapSection from '@/components/MapSection'

export const metadata: Metadata = {
  title: 'Contact Pontotoc Insurance Agency - Get Your Quote Today',
  description: 'Contact Pontotoc Insurance Agency for expert insurance guidance. Located at 158 MS-15, Suite D, Pontotoc, MS. Call (662) 200-2249 or email info@pontotocinsuranceagency.com.',
  keywords: [
    'contact Pontotoc Insurance Agency',
    'insurance agent Pontotoc MS',
    'insurance office Pontotoc',
    'insurance phone number Mississippi',
    'insurance email Pontotoc',
    'insurance consultation Pontotoc',
    'insurance quote Mississippi',
    'insurance appointment Pontotoc'
  ],
  openGraph: {
    title: 'Contact Pontotoc Insurance Agency - Get Your Quote Today',
    description: 'Contact Pontotoc Insurance Agency for expert insurance guidance. Located at 158 MS-15, Suite D, Pontotoc, MS.',
    url: 'https://www.pontotocinsuranceagency.com/contact',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function Contact() {
  return (
    <>
      <ContactHero />
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <MapSection />
    </>
  )
}

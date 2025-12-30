import type { Metadata } from 'next'
import Image from 'next/image'
import { Shield, Users, Award, Heart, TrendingUp, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Pontotoc Insurance Agency | Expert Financial Advisors Mississippi',
  description: 'Learn about Pontotoc Insurance Agency - expert financial advisors with 7+ years of experience. Specializing in life insurance, health insurance, Medicare, and retirement planning in Pontotoc, MS.',
  keywords: [
    'about Pontotoc Insurance Agency',
    'financial advisors Pontotoc MS',
    'insurance agency Mississippi',
    'experienced insurance agents',
    'Pontotoc insurance professionals',
    'financial planning experts',
    'insurance advisors Mississippi'
  ],
  openGraph: {
    title: 'About Us - Pontotoc Insurance Agency | Expert Financial Advisors Mississippi',
    description: 'Learn about Pontotoc Insurance Agency - expert financial advisors with 7+ years of experience. Specializing in life insurance, health insurance, Medicare, and retirement planning.',
    url: 'https://www.pontotocinsuranceagency.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Pontotoc Insurance Agency',
    description: 'Expert financial advisors with 7+ years of experience. Specializing in life insurance, health insurance, Medicare, and retirement planning.',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function About() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Pontotoc Insurance Agency",
    "description": "Expert financial advisors specializing in life insurance, health insurance, Medicare, and retirement planning. Licensed professionals with 7+ years of experience serving Pontotoc, MS and surrounding areas.",
    "url": "https://www.pontotocinsuranceagency.com",
    "logo": "https://www.pontotocinsuranceagency.com/pia_logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "158 MS-15, Suite D",
      "addressLocality": "Pontotoc",
      "addressRegion": "MS",
      "postalCode": "38863",
      "addressCountry": "US"
    },
    "telephone": "+1-662-200-2249",
    "email": "info@pontotocinsuranceagency.com",
    "foundingDate": "2017",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "5-10"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Pontotoc",
        "containedInPlace": {
          "@type": "State",
          "name": "Mississippi"
        }
      },
      {
        "@type": "City",
        "name": "Tupelo",
        "containedInPlace": {
          "@type": "State",
          "name": "Mississippi"
        }
      },
      {
        "@type": "City",
        "name": "Oxford",
        "containedInPlace": {
          "@type": "State",
          "name": "Mississippi"
        }
      }
    ]
  }

  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'We build lasting relationships based on honesty, transparency, and ethical practices.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your financial security is our top priority. We take the time to understand your unique needs.'
    },
    {
      icon: Award,
      title: 'Expertise',
      description: 'Our team of licensed professionals brings 7+ years of combined experience to every consultation.'
    },
    {
      icon: Heart,
      title: 'Personalized Service',
      description: 'We provide customized solutions tailored to your specific financial goals and circumstances.'
    },
    {
      icon: TrendingUp,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable outcomes that help you achieve your financial objectives.'
    },
    {
      icon: CheckCircle,
      title: 'Comprehensive Solutions',
      description: 'From life insurance to retirement planning, we offer a full range of financial services.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">About Pontotoc Insurance Agency</h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Your trusted partner for comprehensive financial planning and insurance solutions in Mississippi
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2017, Pontotoc Insurance Agency has been serving individuals and families throughout 
                Mississippi with expert financial guidance and insurance solutions. What started as a small local 
                agency has grown into a trusted resource for comprehensive financial planning.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our team of licensed professionals brings over 7 years of combined experience in the insurance 
                and financial services industry. We specialize in helping clients navigate the complexities of 
                life insurance, health insurance, Medicare, and retirement planning.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Based in Pontotoc, Mississippi, we serve clients throughout the region, including Tupelo, Oxford, 
                and surrounding communities. Our commitment to personalized service and client education sets us 
                apart in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Icon size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CheckCircle size={24} className="text-primary-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Licensed Professionals</h3>
                    <p className="text-primary-100">All our agents are fully licensed and continuously educated on the latest industry developments.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle size={24} className="text-primary-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Comprehensive Services</h3>
                    <p className="text-primary-100">From life insurance to retirement planning, we offer a full range of financial services under one roof.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle size={24} className="text-primary-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Personalized Approach</h3>
                    <p className="text-primary-100">We take the time to understand your unique situation and create customized solutions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle size={24} className="text-primary-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Local Expertise</h3>
                    <p className="text-primary-100">As a local Mississippi agency, we understand the unique needs of our community.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle size={24} className="text-primary-200 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Ongoing Support</h3>
                    <p className="text-primary-100">We're here for you long after the initial sale, providing ongoing guidance and support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's work together to secure your financial future
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                Contact Us
              </a>
              <a
                href="/team"
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                Meet Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


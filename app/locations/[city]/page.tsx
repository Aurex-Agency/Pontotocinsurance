import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, ArrowRight, CheckCircle } from 'lucide-react'
import ContactCTA from '@/components/ContactCTA'
import { locations, getLocation } from '@/lib/locations'

interface CityPageProps {
  params: { city: string }
}

export function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }))
}

export function generateMetadata({ params }: CityPageProps): Metadata {
  const city = getLocation(params.city)
  if (!city) return {}
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `/locations/${city.slug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `https://pontotocinsuranceagency.com/locations/${city.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: city.metaTitle,
      description: city.metaDescription,
    },
  }
}

export default function CityPage({ params }: CityPageProps) {
  const city = getLocation(params.city)
  if (!city) notFound()

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: 'Pontotoc Insurance Agency',
    url: `https://pontotocinsuranceagency.com/locations/${city.slug}`,
    telephone: '+1-662-200-2249',
    email: 'info@pontotocinsuranceagency.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '158 MS-15, Suite D',
      addressLocality: 'Pontotoc',
      addressRegion: 'MS',
      postalCode: '38863',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'State', name: 'Mississippi' },
    },
    description: city.metaDescription,
  }

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pontotocinsuranceagency.com' },
      { '@type': 'ListItem', position: 2, name: 'Areas We Serve', item: 'https://pontotocinsuranceagency.com/locations' },
      { '@type': 'ListItem', position: 3, name: city.name, item: `https://pontotocinsuranceagency.com/locations/${city.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceData, faqData, breadcrumbData]) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="container-custom section-padding">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-500/20 text-primary-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              <MapPin size={14} />
              Serving {city.name} &amp; {city.county}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
              {city.headline}
            </h1>
            <p className="text-xl text-secondary-100 mb-8">{city.subheadline}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:6622002249"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                (662) 200-2249
              </a>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-secondary-900 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Get a Free Quote
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl font-bold text-gray-900">
              Local Insurance Help for {city.name}
            </h2>
            {city.intro.map((paragraph, i) => (
              <p key={i} className="text-lg text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <ul className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                'Licensed Mississippi advisors',
                'Free quotes and plan reviews',
                'Multiple carriers compared for you',
                'In-person, phone, or video meetings',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="text-primary-600 shrink-0 mt-0.5" size={20} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services for this city */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What We Help {city.name} Families With
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {city.services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white rounded-2xl p-7 border border-primary-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-1.5 text-primary-600 font-semibold">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              {city.name} Insurance Questions, Answered
            </h2>
            <div className="space-y-4">
              {city.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white border border-gray-200 rounded-xl p-6 open:shadow-md"
                >
                  <summary className="cursor-pointer list-none font-semibold text-gray-900 flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-primary-600 transition-transform group-open:rotate-45 text-2xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

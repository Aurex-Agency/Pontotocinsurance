import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import { locations } from '@/lib/locations'

export const metadata: Metadata = {
  title: 'Areas We Serve | Insurance Advisors Across Mississippi',
  description:
    'Pontotoc Insurance Agency serves families across Mississippi, including Pontotoc, Tupelo, Oxford, New Albany, Southaven, Corinth, Amory, Columbus, and Ocean Springs, with life, health, Medicare, and retirement planning. Call (662) 200-2249.',
  alternates: { canonical: '/locations' },
  openGraph: {
    title: 'Areas We Serve | Insurance Advisors Across Mississippi',
    description:
      'Serving Pontotoc, Tupelo, Oxford, New Albany, Southaven, Corinth, Amory, Columbus, Ocean Springs, and all of Mississippi with life, health, Medicare, and retirement planning.',
    url: 'https://pontotocinsuranceagency.com/locations',
    type: 'website',
  },
}

export default function LocationsPage() {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pontotocinsuranceagency.com' },
      { '@type': 'ListItem', position: 2, name: 'Areas We Serve', item: 'https://pontotocinsuranceagency.com/locations' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <section className="bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="container-custom section-padding text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-5">
            Serving Families Across North Mississippi
          </h1>
          <p className="text-xl text-secondary-100 max-w-2xl mx-auto">
            Our office is in Pontotoc, and our advisors work with clients throughout
            the region, in person, by phone, or by video.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Home base */}
            <div className="bg-primary-600 text-white rounded-2xl p-7 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={20} />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Our Office
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                <Link href="/locations/pontotoc" className="hover:underline">
                  Pontotoc, MS
                </Link>
              </h2>
              <p className="text-primary-100 mb-4">
                158 MS-15, Suite D, Pontotoc, MS 38863. Walk-ins and appointments
                welcome.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:6622002249"
                  className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold py-2.5 px-5 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <Phone size={16} />
                  (662) 200-2249
                </a>
                <Link
                  href="/locations/pontotoc"
                  className="inline-flex items-center gap-1.5 border-2 border-white/70 text-white font-semibold py-2 px-5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Insurance in Pontotoc <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {locations.filter((city) => city.slug !== 'pontotoc').map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="group bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3 text-primary-600">
                  <MapPin size={20} />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    {city.county}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {city.name}, MS
                </h2>
                <p className="text-gray-600 mb-4">{city.subheadline}</p>
                <span className="inline-flex items-center gap-1.5 text-primary-600 font-semibold">
                  Insurance in {city.name} <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-10 max-w-2xl mx-auto">
            Don&apos;t see your town? We&apos;re licensed across Mississippi and
            serve every county in the state by phone and video.{' '}
            <Link href="/contact" className="text-primary-600 font-semibold hover:underline">Reach out</Link> and
            we&apos;ll take care of you.
          </p>
        </div>
      </section>
    </>
  )
}

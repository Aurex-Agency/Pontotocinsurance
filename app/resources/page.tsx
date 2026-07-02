import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { articles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Insurance & Medicare Resources for Mississippi',
  description:
    'Plain-English guides on Medicare, health insurance, and retirement planning for Mississippi families, written by the licensed advisors at Pontotoc Insurance Agency.',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: 'Insurance & Medicare Resources for Mississippi',
    description:
      'Plain-English guides on Medicare, health insurance, and retirement planning for Mississippi families.',
    url: 'https://pontotocinsuranceagency.com/resources',
    type: 'website',
  },
}

export default function ResourcesPage() {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pontotocinsuranceagency.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://pontotocinsuranceagency.com/resources' },
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
            Insurance Resources &amp; Guides
          </h1>
          <p className="text-xl text-secondary-100 max-w-2xl mx-auto">
            Plain-English answers to the questions Mississippi families actually
            ask us, written by licensed local advisors.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/resources/${article.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-7 flex flex-col"
              >
                <span className="inline-block self-start bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {article.category}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-5 flex-1">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(article.datePublished + 'T12:00:00').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} />
                    {article.readMinutes} min
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-primary-600 font-semibold">
                  Read the guide <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

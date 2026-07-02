import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Phone, ArrowRight } from 'lucide-react'
import { articles, getArticle, type ArticleBlock } from '@/lib/articles'

interface ArticlePageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticle(params.slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `https://pontotocinsuranceagency.com/resources/${article.slug}`,
      type: 'article',
      publishedTime: article.datePublished,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
    },
  }
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{block.text}</h2>
    case 'h3':
      return <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">{block.text}</h3>
    case 'p':
      return <p className="text-lg text-gray-700 leading-relaxed mb-5">{block.text}</p>
    case 'ul':
      return (
        <ul className="space-y-3 mb-6 list-disc pl-6">
          {block.items.map((item, i) => (
            <li key={i} className="text-lg text-gray-700 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )
    case 'callout':
      return (
        <div className="bg-primary-50 border-l-4 border-primary-600 rounded-r-xl p-6 my-8">
          <p className="font-bold text-gray-900 mb-2">{block.title}</p>
          <p className="text-gray-700 leading-relaxed">{block.text}</p>
        </div>
      )
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    author: {
      '@type': 'Organization',
      name: 'Pontotoc Insurance Agency',
      url: 'https://pontotocinsuranceagency.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pontotoc Insurance Agency',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pontotocinsuranceagency.com/pia_logo.png',
      },
    },
    mainEntityOfPage: `https://pontotocinsuranceagency.com/resources/${article.slug}`,
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pontotocinsuranceagency.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://pontotocinsuranceagency.com/resources' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://pontotocinsuranceagency.com/resources/${article.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleData, breadcrumbData]) }}
      />

      {/* Article header */}
      <section className="bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="container-custom py-14 lg:py-16">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/resources"
              className="text-primary-200 text-sm font-semibold hover:text-primary-100 transition-colors"
            >
              ← All Resources
            </Link>
            <div className="mt-4 mb-4">
              <span className="inline-block bg-primary-500/20 text-primary-200 text-sm font-semibold px-4 py-1 rounded-full">
                {article.category}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-5">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-secondary-200 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} />
                {new Date(article.datePublished + 'T12:00:00').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} />
                {article.readMinutes} min read
              </span>
              <span>By Pontotoc Insurance Agency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {article.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            {/* Related links */}
            <div className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Keep going</h2>
              <ul className="space-y-2">
                {article.related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-primary-600 font-semibold hover:underline"
                    >
                      {link.label} <ArrowRight size={15} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-secondary-900 text-white">
        <div className="container-custom py-14 text-center space-y-5">
          <h2 className="text-3xl font-bold">Questions about your own situation?</h2>
          <p className="text-secondary-100 max-w-xl mx-auto">
            Talk it through with a licensed Mississippi advisor. Free, local, and
            no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:6622002249"
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              (662) 200-2249
            </a>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-secondary-900 font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

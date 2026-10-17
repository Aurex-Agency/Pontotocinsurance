import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutChrome from '@/components/LayoutChrome'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Pontotoc Insurance Agency | Life, Health & Medicare in North Mississippi',
    template: '%s | Pontotoc Insurance Agency'
  },
  description: 'Local, licensed insurance advisors in Pontotoc, MS helping families across North Mississippi with life insurance, health insurance, Medicare, and retirement planning. Free quotes and one-on-one guidance. Call (662) 200-2249.',
  keywords: ['life insurance Pontotoc', 'health insurance Pontotoc', 'Medicare Pontotoc', 'Pontotoc Insurance Agency'],
  authors: [{ name: 'Pontotoc Insurance Agency' }],
  creator: 'Pontotoc Insurance Agency',
  publisher: 'Pontotoc Insurance Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pontotocinsuranceagency.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pontotocinsuranceagency.com',
    title: 'Pontotoc Insurance Agency | Life, Health & Medicare in North Mississippi',
    description: 'Local, licensed insurance advisors in Pontotoc, MS helping families across North Mississippi with life insurance, health insurance, Medicare, and retirement planning.',
    siteName: 'Pontotoc Insurance Agency',
    images: [
      {
        url: '/pia_logo.png',
        width: 800,
        height: 600,
        alt: 'Pontotoc Insurance Agency Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pontotoc Insurance Agency | Life, Health & Medicare in North Mississippi',
    description: 'Local, licensed insurance advisors in Pontotoc, MS helping families across North Mississippi with life, health, Medicare, and retirement planning.',
    images: ['/pia_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch site settings on the server for instant loading
  const { getSiteSettingsData } = await import('@/lib/getSiteSettings')
  const siteSettings = await getSiteSettingsData()
  const structuredData = {
    '@context': 'https://schema.org', '@type': 'InsuranceAgency',
    '@id': 'https://pontotocinsuranceagency.com/#agency',
    name: 'Pontotoc Insurance Agency', url: 'https://pontotocinsuranceagency.com',
    description: 'Life insurance, health insurance and Medicare conversations for North Mississippi residents.',
    telephone: siteSettings.site_phone, email: siteSettings.site_email,
    logo: 'https://pontotocinsuranceagency.com/pia_logo.png',
    address: { '@type': 'PostalAddress', streetAddress: '158 MS-15, Suite D', addressLocality: 'Pontotoc', addressRegion: 'MS', postalCode: '38863', addressCountry: 'US' }
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-E8MB7HL2TR'} />
        <LayoutChrome footerSettings={siteSettings}>
          {children}
        </LayoutChrome>
      </body>
    </html>
  )
}

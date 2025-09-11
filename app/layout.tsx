import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Pontotoc Insurance Agency - Your Trusted Insurance Partner',
    template: '%s | Pontotoc Insurance Agency'
  },
  description: 'Comprehensive insurance solutions for Home, Auto, Life, Health, Medicare, and Retirement Planning. Your trusted local insurance agency in Pontotoc, Mississippi. Licensed professionals with 15+ years experience.',
  keywords: [
    'insurance Pontotoc MS',
    'home insurance Mississippi',
    'auto insurance Pontotoc',
    'life insurance Mississippi',
    'health insurance Pontotoc',
    'Medicare insurance Mississippi',
    'Medicare Advantage plans',
    'Medigap insurance',
    'retirement planning Mississippi',
    'insurance agent Pontotoc',
    'local insurance agency',
    'insurance quotes Mississippi',
    'affordable insurance Pontotoc',
    'insurance broker Mississippi'
  ],
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pontotocinsuranceagency.com',
    title: 'Pontotoc Insurance Agency - Your Trusted Insurance Partner',
    description: 'Comprehensive insurance solutions for Home, Auto, Life, Health, Medicare, and Retirement Planning. Your trusted local insurance agency in Pontotoc, Mississippi.',
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
    title: 'Pontotoc Insurance Agency - Your Trusted Insurance Partner',
    description: 'Comprehensive insurance solutions for Home, Auto, Life, Health, Medicare, and Retirement Planning. Your trusted local insurance agency in Pontotoc, Mississippi.',
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
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Pontotoc Insurance Agency",
    "alternateName": "PIA",
    "description": "Comprehensive insurance solutions for Home, Auto, Life, Health, Medicare, and Retirement Planning. Your trusted local insurance agency in Pontotoc, Mississippi.",
    "url": "https://pontotocinsuranceagency.com",
    "logo": "https://pontotocinsuranceagency.com/pia_logo.png",
    "image": "https://pontotocinsuranceagency.com/pia_logo.png",
    "telephone": "+1-662-200-2249",
    "email": "info@pontotocinsuranceagency.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "158 MS-15, Suite D",
      "addressLocality": "Pontotoc",
      "addressRegion": "MS",
      "postalCode": "38863",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.2479",
      "longitude": "-89.0067"
    },
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-14:00"
    ],
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
    ],
    "serviceType": [
      "Home Insurance",
      "Auto Insurance", 
      "Life Insurance",
      "Health Insurance",
      "Medicare Insurance",
      "Retirement Planning"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Insurance Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Insurance",
            "description": "Comprehensive home insurance coverage for dwelling, personal property, and liability protection."
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Auto Insurance",
            "description": "Complete auto insurance coverage including liability, collision, and comprehensive protection."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Life Insurance",
            "description": "Term and permanent life insurance options to protect your loved ones."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Health Insurance", 
            "description": "Individual and family health insurance plans with comprehensive coverage options."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Medicare Insurance",
            "description": "Medicare Advantage, Medigap, and Prescription Drug Plans for seniors."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Retirement Planning",
            "description": "Comprehensive retirement planning including 401(k), IRA, and annuity strategies."
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/pontotocinsuranceagency",
      "https://www.linkedin.com/company/pontotoc-insurance-agency"
    ]
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
        {/* <GoogleAnalytics measurementId="G-XXXXXXXXXX" /> */}
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

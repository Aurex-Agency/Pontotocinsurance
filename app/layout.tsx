import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Pontotoc Insurance Agency - Expert Financial Advisors | Life Insurance, Health Insurance & Retirement Planning',
    template: '%s | Pontotoc Insurance Agency'
  },
  description: 'Premier financial advisors specializing in life insurance, health insurance, Medicare, and retirement planning. Expert wealth management and estate planning services for high-net-worth individuals and families in Mississippi. Licensed professionals with 7+ years experience.',
  keywords: [
    'financial advisor Mississippi',
    'life insurance advisor Pontotoc',
    'health insurance broker Mississippi',
    'retirement planning advisor',
    'wealth management Mississippi',
    'estate planning Pontotoc',
    'high net worth financial advisor',
    'life insurance quotes Mississippi',
    'health insurance plans Mississippi',
    'Medicare advisor Pontotoc',
    'retirement planning services',
    '401k rollover advisor',
    'IRA management Mississippi',
    'annuity advisor Pontotoc',
    'term life insurance Mississippi',
    'whole life insurance advisor',
    'universal life insurance',
    'Medicare Advantage plans Mississippi',
    'Medigap insurance Pontotoc',
    'financial planning services',
    'investment advisor Mississippi',
    'tax planning advisor',
    'financial consultant Pontotoc',
    'insurance agent Mississippi',
    'licensed financial advisor'
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
    title: 'Pontotoc Insurance Agency - Expert Financial Advisors | Life Insurance, Health Insurance & Retirement Planning',
    description: 'Premier financial advisors specializing in life insurance, health insurance, Medicare, and retirement planning. Expert wealth management and estate planning services for high-net-worth individuals and families in Mississippi.',
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
    title: 'Pontotoc Insurance Agency - Expert Financial Advisors | Life Insurance, Health Insurance & Retirement Planning',
    description: 'Premier financial advisors specializing in life insurance, health insurance, Medicare, and retirement planning. Expert wealth management and estate planning services for high-net-worth individuals and families in Mississippi.',
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
    "description": "Premier financial advisors specializing in life insurance, health insurance, Medicare, and retirement planning. Expert wealth management and estate planning services for high-net-worth individuals and families in Pontotoc, Mississippi.",
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
      "Life Insurance",
      "Health Insurance",
      "Medicare Insurance",
      "Retirement Planning",
      "Wealth Management",
      "Estate Planning",
      "Financial Planning"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Financial Advisory Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Life Insurance",
            "description": "Comprehensive life insurance solutions including term, whole, and universal life policies. Expert guidance for estate planning and wealth transfer strategies for high-net-worth individuals."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Health Insurance", 
            "description": "Expert health insurance brokerage services for individuals, families, and businesses. Navigate the marketplace with personalized guidance and comprehensive coverage options."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Medicare Insurance",
            "description": "Specialized Medicare advisory services including Medicare Advantage, Medigap, and Prescription Drug Plans. Expert guidance for seniors and their families."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Retirement Planning",
            "description": "Comprehensive retirement planning and wealth management services including 401(k) rollovers, IRA management, annuities, Social Security optimization, and investment strategies for long-term financial security."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wealth Management",
            "description": "Personalized wealth management and investment advisory services for high-net-worth individuals and families seeking long-term financial growth and security."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Estate Planning",
            "description": "Expert estate planning services to protect and transfer wealth efficiently, including life insurance strategies for estate tax planning and legacy building."
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61555385591316",
      "https://www.instagram.com/pontotocinsuranceagency",
      "https://www.linkedin.com/company/pontotoc-insurance-agency/",
      "https://www.tiktok.com/@pontotocinsurance"
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

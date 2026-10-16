'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const [productionHost, setProductionHost] = useState(false)
  useEffect(() => {
    setProductionHost(['pontotocinsuranceagency.com', 'www.pontotocinsuranceagency.com'].includes(window.location.hostname))
  }, [])
  if (!productionHost || process.env.NODE_ENV !== 'production' || !/^G-[A-Z0-9]+$/.test(measurementId)) return null
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        page_title: document.title,
        page_location: window.location.origin + window.location.pathname,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
    `}</Script>
  </>
}

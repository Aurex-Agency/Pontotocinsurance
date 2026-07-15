'use client'

import Script from 'next/script'

// GoHighLevel site-wide tracking. Loads on every page (including the funnels)
// so page views and on-page activity flow into GHL. Override the tracking ID
// with NEXT_PUBLIC_GHL_TRACKING_ID if it ever changes.
const TRACKING_ID =
  process.env.NEXT_PUBLIC_GHL_TRACKING_ID || 'tk_a174fcd1352d403591b096aedd0f5f94'

export default function GHLTracking() {
  if (!TRACKING_ID) return null

  return (
    <Script
      id="ghl-external-tracking"
      src="https://link.pontotocinsuranceagency.com/js/external-tracking.js"
      data-tracking-id={TRACKING_ID}
      strategy="afterInteractive"
    />
  )
}

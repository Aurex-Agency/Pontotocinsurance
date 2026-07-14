'use client'

import Script from 'next/script'

// Meta (Facebook) Pixel — used on the funnel pages (/webinarlink,
// /webinarlink/watch, and /glp1-quiz), not site-wide. Tracks PageView; the
// funnels fire their own conversion events (Lead, ScheduleView).
// Override the ID with NEXT_PUBLIC_META_PIXEL_ID if needed.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '2113541802917501'

export default function MetaPixel() {
  if (!PIXEL_ID) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          // Guard so init + PageView fire exactly once per page load, even if
          // this script runs twice (React Strict Mode double-mount in dev, or
          // any client-side remount). Without this, PageView double-fires.
          if (!window._piaPixelLoaded) {
            window._piaPixelLoaded = true;
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          }
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

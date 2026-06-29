'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import type { SiteSettingsData } from '@/lib/getSiteSettings'

// Hides the site header/footer on distraction-free funnel routes (e.g. the
// webinar funnel), while keeping them everywhere else.
const BARE_PREFIXES = ['/webinarlink']

export default function LayoutChrome({
  children,
  footerSettings,
}: {
  children: React.ReactNode
  footerSettings: SiteSettingsData
}) {
  const pathname = usePathname() || ''
  const bare = BARE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )

  if (bare) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer initialSettings={footerSettings} />
    </>
  )
}

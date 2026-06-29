import type { Metadata } from 'next'
import WebinarPlayer from '@/components/webinar/WebinarPlayer'

export const metadata: Metadata = {
  title: 'Watch: How Is Medicare Changing in 2026',
  description: 'Your on-demand Medicare 2026 webinar from Pontotoc Insurance Agency.',
  robots: { index: false, follow: false },
}

export default function WebinarWatchPage() {
  return <WebinarPlayer />
}

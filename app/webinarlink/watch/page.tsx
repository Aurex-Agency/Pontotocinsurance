import type { Metadata } from 'next'
import WebinarPlayer from '@/components/webinar/WebinarPlayer'

export const metadata: Metadata = {
  title: 'Watch the Webinar | Pontotoc Insurance Agency',
  description: 'Your on-demand webinar from Pontotoc Insurance Agency.',
  robots: { index: false, follow: false },
}

export default function WebinarWatchPage() {
  return <WebinarPlayer />
}

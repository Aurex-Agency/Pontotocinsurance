import type { Metadata } from 'next'
import WebinarSignup from '@/components/webinar/WebinarSignup'

export const metadata: Metadata = {
  title: 'How Is Medicare Changing in 2026',
  description:
    'Free on-demand webinar: how Medicare is changing in 2026 and how to protect yourself, from Pontotoc Insurance Agency.',
  robots: { index: false, follow: false },
}

export default function WebinarSignupPage() {
  return <WebinarSignup />
}

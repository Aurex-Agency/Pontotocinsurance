import type { Metadata } from 'next'
import WebinarSignup from '@/components/webinar/WebinarSignup'

export const metadata: Metadata = {
  title: 'Free On-Demand Webinar | Pontotoc Insurance Agency',
  description:
    'Register to watch our free on-demand insurance and retirement webinar from Pontotoc Insurance Agency.',
  robots: { index: false, follow: false },
}

export default function WebinarSignupPage() {
  return <WebinarSignup />
}

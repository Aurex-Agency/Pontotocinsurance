import { Suspense } from 'react'
import SecureEmailLink from './SecureEmailLink'
export const metadata = { robots: { index: false, follow: false } }
export default function Page() { return <Suspense fallback={<p role="status">Loading secure page...</p>}><SecureEmailLink /></Suspense> }

import { Suspense } from 'react'
import ResetPassword from './ResetPassword'
export const metadata = { robots: { index: false, follow: false } }
export default function Page() { return <Suspense fallback={<p role="status">Loading secure page...</p>}><ResetPassword /></Suspense> }

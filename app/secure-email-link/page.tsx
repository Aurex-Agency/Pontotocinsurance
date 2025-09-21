'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SecureEmailLink() {
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const link = searchParams.get('link')
    
    if (!link) {
      setError('No link provided')
      setStatus('error')
      return
    }

    // Validate that it's a Supabase auth link
    if (!link.includes('supabase.co') || !link.includes('/auth/v1/verify')) {
      setError('Invalid link format')
      setStatus('error')
      return
    }

    // Small delay to show loading state, then redirect
    setStatus('redirecting')
    
    // Use a small delay to prevent immediate redirect (helps with some scanners)
    // Also add a user interaction requirement for extra security
    const timer = setTimeout(() => {
      // Check if this is a direct navigation (not a scanner)
      if (document.referrer === '' || document.referrer.includes(window.location.hostname)) {
        window.location.href = link
      } else {
        // If it looks like a scanner, show a manual click button
        setStatus('loading')
        setError('Please click the button below to continue with your password reset.')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchParams])

  const handleManualRedirect = () => {
    const link = searchParams.get('link')
    if (link) {
      window.location.href = link
    }
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/admin/login')}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  if (error && !status.includes('Invalid')) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Check</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleManualRedirect}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Continue Password Reset
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {status === 'loading' ? 'Verifying Link...' : 'Redirecting...'}
        </h2>
        <p className="text-gray-600">
          {status === 'loading' 
            ? 'Please wait while we verify your email link.' 
            : 'Redirecting you to the password reset page...'
          }
        </p>
      </div>
    </div>
  )
}

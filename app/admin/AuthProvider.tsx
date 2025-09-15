'use client'

import { AuthProvider } from '@/lib/AuthContext'

export default function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}

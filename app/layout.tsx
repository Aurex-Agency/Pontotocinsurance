import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pontotoc Insurance Agency - Your Trusted Insurance Partner',
  description: 'Comprehensive insurance solutions for Home, Auto, Life, Health, and Retirement Planning. Your trusted local insurance agency in Pontotoc, Mississippi.',
  keywords: 'insurance, home insurance, auto insurance, life insurance, health insurance, retirement planning, Pontotoc, Mississippi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

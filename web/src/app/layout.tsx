import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import ServiceWorker from '@/components/ServiceWorker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyWorkApp.io - Turnkey Inventory Management Solution',
  description: 'A complete turnkey solution for modern inventory management and workflow optimization. Specializing in Logistics, Digital Warehouse Management, IoT Sensors, and Custom Workflow Development.',
  manifest: '/manifest.json',
  themeColor: '#4A90E2',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MyWorkApp.io',
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="MyWorkApp.io" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MyWorkApp.io" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#4A90E2" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <GoogleAnalytics />
        <ServiceWorker />
      </body>
    </html>
  )
}

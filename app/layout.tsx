import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import { PageTracker } from '@/components/page-tracker'
import { PwaRegister } from '@/components/pwa-register'
import { SiteFooter } from '@/components/site-footer'
import { AIChatWrapper } from '@/components/ai-chat-wrapper'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mickala Group | Low Voltage LED Lighting Towers',
  description:
    'Australian-owned OEM manufacturer of extra-low-voltage LED lighting towers for mining, construction and industrial operations. Design, manufacture, maintenance and 24/7/365 support.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mickala Ops',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#c1272d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} bg-background`}>
      <body className="font-sans antialiased">
        <PageTracker />
        <PwaRegister />
        {children}
        <SiteFooter />
        <AIChatWrapper />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

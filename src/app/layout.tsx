import Header from '@/components/ui/header'
import RootProvider from '@/providers'
// eslint-disable-next-line boundaries/no-unknown
import '@/styles/globals.css'
import { Geist } from 'next/font/google'
import { type Metadata, type Viewport } from 'next'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Nextj.js Starter',
  description: 'Get started quickly with Nextj.js, Postgres, shadcn',
}

export const viewport: Viewport = {
  maximumScale: 1,
}

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.className}`} suppressHydrationWarning>
      <body className="min-h-[100dvh antialiased">
        <RootProvider>
          <main>{children}</main>
          <Toaster />
        </RootProvider>
      </body>
    </html>
  )
}

//export const dynamic = 'force-dynamic';

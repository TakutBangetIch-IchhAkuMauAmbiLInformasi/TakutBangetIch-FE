import type { Metadata } from 'next'
import './globals.css'
import ClientProvider from './providers'

export const metadata: Metadata = {
  title: 'SkripsiGratis - Find Academic Papers for Free',
  description: 'Search engine for academic papers to help with your thesis and research needs',
  generator: 'SkripsiGratis',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}

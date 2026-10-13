import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claire Liu',
  description: 'Claire Liu’s portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

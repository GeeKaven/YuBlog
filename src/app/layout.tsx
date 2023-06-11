'use client'

import '../styles/index.scss'
import '../styles/highlighting.scss'
import NextTopLoader from 'nextjs-toploader'
import { ThemeProvider } from 'next-themes'
import LayoutWrapper from '@/components/Layout'
import SiteMeta from '@/data/siteMeta'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <NextTopLoader showSpinner={false} color='#4f46e5' />
        <ThemeProvider attribute='class' defaultTheme={SiteMeta.theme}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

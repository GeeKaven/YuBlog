'use client'

import '../styles/index.scss'
import '../styles/highlighting.scss'
import NextNProgress from 'nextjs-progressbar'
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
        <NextNProgress options={{ showSpinner: false }} />
        <ThemeProvider attribute='class' defaultTheme={SiteMeta.theme}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

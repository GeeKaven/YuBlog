import '../styles/index.scss'
import '../styles/highlighting.scss'
import LayoutWrapper from '@/components/Layout'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import SiteMeta from '@/data/siteMeta'

dayjs.extend(localizedFormat)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress options={{ showSpinner: false }} />
      <ThemeProvider attribute='class' defaultTheme={SiteMeta.theme}>
        <Head>
          <meta content='width=device-width, initial-scale=1' name='viewport' />
          <link rel='icon' type='image/x-icon' href='/favicons/favicon.ico' />
          <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='/favicons/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicons/favicon-16x16.png'
          />
          <link rel='manifest' href='/favicons/site.webmanifest' />
          <link
            rel='mask-icon'
            href='/favicons/safari-pinned-tab.svg'
            color='#5bbad5'
          />
          <meta name='msapplication-TileColor' content='#000000' />
          <meta
            name='theme-color'
            media='(prefers-color-scheme: light)'
            content='#fff'
          />
          <meta
            name='theme-color'
            media='(prefers-color-scheme: dark)'
            content='#000'
          />
          <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
        </Head>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </ThemeProvider>
    </>
  )
}

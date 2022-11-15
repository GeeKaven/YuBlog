import '../styles/index.scss'
import '../styles/highlighting.scss'
import Layout from '@/components/Layout'
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
      <NextNProgress color='#6366f1' options={{ showSpinner: false }} />
      <ThemeProvider attribute='class' defaultTheme={SiteMeta.theme}>
        <Head>
          <meta content='width=device-width, initial-scale=1' name='viewport' />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

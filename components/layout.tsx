import Link from 'next/link'
import { ReactNode } from 'react'
import Container from './container'
import Footer from './footer'
import HeaderNav from '@/data/headerNav'
import SiteMeta from '@/data/siteMeta'

type LayoutProps = {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <div className='flex h-screen flex-col justify-between'>
        <header className='flex items-center justify-between py-10'>
          <Link href='/' aria-label={SiteMeta.headerTitle}>
            <div className='flex items-center justify-between'>
              <img
                className='hidden sm:inline-block h-7 cursor-pointer mr-4'
                src='/logo.svg'
                alt='log'
              />
              <div className='hidden h-6 text-2xl font-semibold sm:block'>
                {SiteMeta.headerTitle}
              </div>
            </div>
          </Link>
          <div className='flex items-center text-base leading-5'>
            <div className='hidden sm:block mr-8'>
              {HeaderNav.map((nav) => (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className='font-medium text-lg mx-2 py-2 px-4 rounded-lg leading-loose transition hover:bg-slate-200/50 dark:hover:bg-zinc-800/50'
                >
                  {nav.title}
                </Link>
              ))}
            </div>
            {/*Todo: MobileNav and theme switch */}
          </div>
        </header>
        <main className='mb-auto'>{children}</main>
        <Footer />
      </div>
    </Container>
  )
}

export default Layout

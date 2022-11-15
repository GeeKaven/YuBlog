import Link from 'next/link'
import { ReactNode } from 'react'
import Container from './Container'
import Footer from './Footer'
import HeaderNav from '@/data/headerNav'
import SiteMeta from '@/data/siteMeta'
import Logo from '@/data/logo.svg'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

type LayoutProps = {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <div className='flex flex-col justify-between h-screen'>
        <header className='flex items-center justify-between py-10'>
          <Link href='/' aria-label={SiteMeta.headerTitle}>
            <div className='flex items-center justify-between'>
              <div className='mr-3'>
                <Logo />
              </div>
              <div className='hidden h-6 text-2xl font-semibold sm:block'>
                {SiteMeta.headerTitle}
              </div>
            </div>
          </Link>
          <div className='flex items-center text-base leading-5'>
            <div className='hidden sm:block'>
              {HeaderNav.map((nav) => (
                <Link
                  key={nav.href}
                  href={nav.href}
                  className='font-medium text-lg py-2 px-4 rounded-lg leading-loose transition hover:bg-slate-200/50 dark:hover:bg-zinc-800/50'
                >
                  {nav.title}
                </Link>
              ))}
            </div>
            {/*Todo: MobileNav and theme switch */}
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className='mb-auto'>{children}</main>
        <Footer />
      </div>
    </Container>
  )
}

export default Layout

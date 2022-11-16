import Link from 'next/link'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import Container from './Container'
import Footer from './Footer'
import HeaderNav from '@/data/headerNav'
import SiteMeta from '@/data/siteMeta'
import MobileNav from '@/components/MobileNav'
import ThemeSwitch from '@/components/ThemeSwitch'
import BackToTop from './BackToTop'
import Header from './Header'

type LayoutProps = {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => setNavShow((status) => !status)

  return (
    <>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
      <Header onToggleNav={onToggleNav} />
      <div className='mx-auto max-w-3xl px-4 sm:px-6 mt-[70px]'>
        <div className='flex flex-col justify-between h-screen'>
          <main className='mb-auto'>{children}</main>
          <Footer />
          <BackToTop />
        </div>
      </div>
    </>
  )
}

export default Layout

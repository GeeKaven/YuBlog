'use client'

import { ReactNode, useState } from 'react'
import Footer from './Footer'
import MobileNav from '@/components/MobileNav'
import BackToTop from './BackToTop'
import Header from './Header'

type LayoutProps = {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => setNavShow((status) => !status)

  return (
    <div className='flex flex-col min-h-full'>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
      <Header onToggleNav={onToggleNav} />
      <main className='flex-grow mx-auto w-3/4 px-4 sm:px-6 mt-[70px]'>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default Layout

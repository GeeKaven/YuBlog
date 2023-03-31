import Hero from '@/components/Hero'
import HomePage from './HomePage'

import type { Metadata } from 'next'
import { PageSEO } from '@/lib/utils/seo'

export const metadata: Metadata = PageSEO('HOME', "GeeKaven's Blog")

export default function Page() {
  return (
    <div>
      <Hero />
      <HomePage />
    </div>
  )
}

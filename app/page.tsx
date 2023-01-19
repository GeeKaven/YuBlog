import Hero from '@/components/Hero'
import { PageSEO } from '@/components/SEO'
import SiteMeta from '@/data/siteMeta'
import HomePage from "./HomePage";

export default function Page() {
  return (
    <div>
      <PageSEO title={SiteMeta.title} description={SiteMeta.description} />
      <Hero />
      <HomePage />
    </div>
  )
}

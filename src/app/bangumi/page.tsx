import Bangumi from '@/components/Bangumi'
import { PageSEO } from '@/lib/utils/seo'
import { Metadata } from 'next'

export const metadata: Metadata = PageSEO('Bangumi - 番剧', '我的追番记录!!!')

export default function Page() {
  return (
    <>
      <Bangumi />
    </>
  )
}

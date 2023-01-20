'use client'

import { PageSEO } from "@/components/SEO";
import Bangumi from "@/components/Bangumi";

export default function Page() {

  return (
    <>
      <PageSEO title={`Bangumi - 番剧`} description="我的追番记录!!!" />
      <Bangumi />
    </>
  )
}
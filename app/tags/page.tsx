import { slug } from 'github-slugger'
import { getAllTags } from '@/lib/utils/tag'
import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import SiteMeta from '@/data/siteMeta'

export default function Tags() {
  const tags = getAllTags()

  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO
        title={`标签 - ${SiteMeta.author}`}
        description='Things I blog about'
      />
      <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0'>
        <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14'>
            标签
          </h1>
        </div>
        <div className='flex max-w-lg flex-wrap'>
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className='mt-2 mb-2 mr-5'>
                <Link
                  href={`/tags/${slug(t)}`}
                  className='mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                >
                  {t}
                </Link>
                <Link
                  href={`/tags/${slug(t)}`}
                  className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

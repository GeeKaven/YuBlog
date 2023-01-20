import { PageSEO } from '@/components/SEO'
import SiteMeta from '@/data/siteMeta'
import dayjs from 'dayjs'
import Link from 'next/link'
import Pagination from '@/components/Pagination'
import { DocumentTypes } from 'contentlayer/generated'
import { formatDate } from '@/lib/utils/time'

type ListLayoutProps = {
  posts: DocumentTypes[]
  displayPosts: DocumentTypes[]
  pagination?: PaginationType
  title: string
}

const ListLayout = ({
  posts,
  displayPosts = [],
  pagination,
  title,
}: ListLayoutProps) => {
  return (
    <>
      <PageSEO title={`${title} - ${SiteMeta.author}`} description={SiteMeta.description} />
      <div>
        <p className='text-4xl mt-14 mb-10'>
          {title}
        </p>
      </div>
      <div className='flex-1'>
        {displayPosts.map((post, index) => (
          <div key={index}>
            {(index === 0 ||
              dayjs(displayPosts[index - 1].date).year() !==
                dayjs(post.date).year()) && (
              <p className="font-medium text-2xl sm:text-3xl before:content-['#_'] before:text-primary-500">
                {dayjs(post.date).year()}
              </p>
            )}
            <article key={index} className='my-8'>
              <p className='font-medium text-lg sm:text-xl'>
                <Link
                  href={`${post.url}`}
                  className='hover:text-primary-500'
                >
                  {post.title}
                </Link>
              </p>
              <span className='font-medium inline-block text-sm mt-2 text-gray-500 dark:text-gray-400'>
                {formatDate(post.date, 'LL')}
              </span>
            </article>
          </div>
        ))}
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          path={pagination.path}
        />
      )}
    </>
  )
}

export default ListLayout

import dayjs from 'dayjs'
import Link from 'next/link'
import Pagination from '../components/Pagination'

type ListLayoutProps = {
  posts: PostFrontmatter[]
  displayPosts: PostFrontmatter[]
  pagination: PaginationType
  title: string
  path: string
  postPath: string
  pagePath: string
}

const ListLayout = ({
  posts,
  displayPosts,
  pagination,
  title,
}: ListLayoutProps) => {
  return (
    <>
      <div>
        <h1 className='text-4xl mt-14 mb-10'>
          {title}
        </h1>
      </div>
      <div className='flex-1'>
        {displayPosts.map((post, index) => (
          <div key={index}>
            {(index === 0 ||
              dayjs(displayPosts[index - 1].date).year() !==
                dayjs(post.date).year()) && (
              <h2 className="font-medium text-2xl sm:text-3xl before:content-['#_'] before:text-primary">
                {dayjs(post.date).year()}
              </h2>
            )}
            <article key={index} className='my-8'>
              <h3 className='font-medium text-lg sm:text-xl'>
                <Link
                  href={`${post.slug}`}
                  className='hover:text-primary-500'
                >
                  {post.title}
                </Link>
              </h3>
              <span className='font-medium inline-block text-sm mt-2 opacity-50'>
                {dayjs(post.date).format('LL')}
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

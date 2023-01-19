import { use } from 'react'
import { getAllPostFrontMatter } from '@/lib/utils/post'
import Link from 'next/link'
import { POSTS_PER_PAGE } from '@/layouts/ListLayout'

const List = ({
  title,
  list,
  folder,
}: {
  title: string
  list: PostFrontmatter[]
  folder: string
}) => (
  <div className='flex-1 mb-10'>
    <p className='text-3xl font-bold'>{title}</p>
    <div className='flex-1'>
      {list &&
        list.length > 0 &&
        list.map((post, index) => (
          <article key={index} className='my-8'>
            <p className='font-medium text-lg sm:text-xl'>
              <Link href={`${post.slug}`} className='hover:text-primary-500'>
                {post.title}
              </Link>
            </p>
            <span className='font-medium inline-block text-sm mt-2 text-gray-500 dark:text-gray-400'>
              {post.formatDate}
            </span>
          </article>
        ))}
    </div>
    <div className='text-base font-medium leading-6'>
      <Link
        href={`/${folder}`}
        className='text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-500'
        aria-label={`Read "${folder}"`}
      >
        查看全部
      </Link>
    </div>
  </div>
)

export default function HomePage() {
  const blogPosts = use(getAllPostFrontMatter(['blog']))
  const remarkPosts = use(getAllPostFrontMatter(['remark']))

  return (
    <div className='flex flex-col'>
      <List
        title='最新文章'
        list={blogPosts.slice(0, POSTS_PER_PAGE)}
        folder='blog'
      />
      <List
        title='最新随笔'
        list={remarkPosts.slice(0, POSTS_PER_PAGE)}
        folder='remark'
      />
    </div>
  )
}

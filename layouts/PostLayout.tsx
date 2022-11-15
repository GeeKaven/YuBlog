import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import ListItem from '../components/list/ListItem'
import OrderedList from '../components/list/OrderedList'
import UnorderedList from '../components/list/UnorderedList'
import Link from 'next/link'
import { HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi'

type PostLayoutProps = {
  code: string
  frontmatter: PostFrontmatter
  prev: { link: string; title: string }
  next: { link: string; title: string }
}

const components = {}

const PostLayout = (props: PostLayoutProps) => {
  const { code, frontmatter, prev, next } = props
  const MDXComponent = useMemo(() => getMDXComponent(code), [code])
  return (
    <div>
      <h1 className='mt-14 sm:mt-16 text-2xl sm:text-4xl text-black dark:text-white !leading-snug tracking-tight font-medium'>
        {frontmatter.title}
      </h1>
      <div className='flex w-full'>
        <article className='prose prose-lg dark:prose-dark w-full mt-10 max-w-none'>
          <MDXComponent components={components} />
        </article>
      </div>
      <hr className='my-12 h-px border-gray-200 dark:border-gray-700 box-content' />
      <div className='mb-20 flex justify-between space-x-6 sm:space-x-12 sm:text-lg font-bold'>
        {/*上一篇 */}
        <span className='w-1/2'>
          {prev && (
            <Link
              href={prev.link}
              className='group flex h-full border border-gray-400/20 rounded-xl p-3 sm:p-6 transition gap-2'
            >
              <HiArrowSmLeft className='text-2xl sm:text-3xl shrink-0 text-primary-500 transition ease-out-back duration-500 sm:group-hover:-translate-x-2' />
              {prev.title}
            </Link>
          )}
        </span>
        {/*下一篇 */}
        <span className='w-1/2 text-right'>
          {next && (
            <Link
              href={next.link}
              className='group flex justify-end h-full border border-gray-400/20 rounded-xl p-3 sm:p-6 transition gap-2'
            >
              {next.title}
              <HiArrowSmRight className='text-2xl sm:text-3xl shrink-0 text-primary-500 transition ease-out-back duration-500 sm:group-hover:translate-x-2' />
            </Link>
          )}
        </span>
      </div>
    </div>
  )
}

export default PostLayout

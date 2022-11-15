import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import ListItem from '@/components/ListItem'
import Link from 'next/link'
import { HiArrowSmLeft, HiArrowSmRight, HiOutlineClock } from 'react-icons/hi'
import { slug } from 'github-slugger'
import dayjs from 'dayjs'
import { BlogSEO } from '@/components/SEO'
import SiteMeta from '@/data/siteMeta'

type PostLayoutProps = {
  code: string
  frontmatter: PostFrontmatter
  prev: { link: string; title: string }
  next: { link: string; title: string }
}

const components = {
  li: ListItem
}

const PostLayout = (props: PostLayoutProps) => {
  const { code, frontmatter, prev, next } = props
  const MDXComponent = useMemo(() => getMDXComponent(code), [code])

  return (
    <div className='break-all'>
      <BlogSEO
        url={`${SiteMeta.siteUrl}/${slug}`}
        {...frontmatter}
      />
      <h1 className='mt-12 sm:mt-14 text-2xl sm:text-4xl text-black dark:text-white !leading-snug tracking-tight font-medium'>
        {frontmatter.title}
      </h1>
      {/*发布时间 */}
      <div className='text-gray-600 dark:text-gray-400 flex items-center text-sm mt-4'>
        <HiOutlineClock className='mr-1 text-lg'/>
        {`发布时间：`}
        {dayjs(frontmatter.date).format('LL')}
      </div>
      {/*标签 */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className='flex items-center flex-wrap m-auto mt-6 sm:mt-12 text-sm gap-2 sm:gap-3'>
          {frontmatter.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${slug(tag)}`}
              className='bg-pink-500/10 text-pink-500 hover:text-pink-600 px-2 py-1 rounded font-bold transition'
            >
              {slug(tag)}
            </Link>
          ))}
        </div>
      )}
      <div className='flex w-full'>
        {/* 文章详情 */}
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

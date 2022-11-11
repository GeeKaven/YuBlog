import React from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { PostFrontmatter } from '@/interfaces/post'
import Link from 'next/link'

type PostProps = {
  code: string
  frontmatter: PostFrontmatter
}

const Post = ({ code, frontmatter }: PostProps) => {
  const { title, date, tags, toc = true } = frontmatter
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <div className='container break-all'>
      <h1 className='mt-14 sm:mt-16 text-2xl sm:text-4xl text-black dark:text-white !leading-snug tracking-tight font-medium'>
        {title}
      </h1>
      {tags && tags.length > 0 && (
        <div className="flex items-center flex-wrap m-auto mt-6 sm:mt-12 text-sm gap-2 sm:gap-3">
          {tags.map((tag: string) => (
            <Link key={tag} href={`/tags/${tag}`} className='"bg-pink-500/10 text-pink-500 hover:text-pink-700 px-2 py-1 rounded font-medium transition'>
              {tag}
            </Link>
          ))}
        </div>
      )}
      <div className='relative flex w-full'>
        <div className='flex-1 w-0'>
          <article className='markdown-body w-full mt-10'>
            <Component/>
          </article>
        </div>
      </div>
    </div>
  )
}

export default Post

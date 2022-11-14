import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import ListItem from '../components/list/ListItem'
import OrderedList from '../components/list/OrderedList'
import UnorderedList from '../components/list/UnorderedList'

type PostLayoutProps = {
  code: string
  frontmatter: PostFrontmatter
  prev: { link: string; title: string }
  next: { link: string; title: string }
}

const components = {
  
}

const PostLayout = (props: PostLayoutProps) => {
  const { code, frontmatter, prev, next } = props
  const MDXComponent = useMemo(() => getMDXComponent(code), [code])
  return (
    <div>
      <h1 className='mt-14 sm:mt-16 text-2xl sm:text-4xl text-black dark:text-white !leading-snug tracking-tight font-medium'>
        {frontmatter.title}
      </h1>
      <article className='prose prose-lg dark:prose-dark w-full mt-10 max-w-none'>
        <MDXComponent components={components} />
      </article>
    </div>
  )
}

export default PostLayout

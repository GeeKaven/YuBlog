import { bundleMDX } from 'mdx-bundler'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import path from 'path'
import { formatSlug, getAdjacentPost, getAllPostPaths } from 'utils/post'
import { PostFrontmatter } from '@/interfaces/post'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import dayjs from 'dayjs'
import ListItem from '@/components/list/ListItem'
import OrderedList from '@/components/list/OrderedList'
import UnorderedList from '@/components/list/UnorderedList'

const root = process.cwd()

type PostProps = {
  code: string
  frontmatter: PostFrontmatter
  prev: { link: string; title: string }
  next: { link: string; title: string }
}

const components = {
  li: ListItem,
  ol: OrderedList,
  ul: UnorderedList
}

export default function Post(props: PostProps) {
  const { code, frontmatter, prev, next } = props
  const MDXComponent = useMemo(() => getMDXComponent(code), [code])
  return (
    <div>
      <h1 className="mt-14 sm:mt-16 text-2xl sm:text-4xl text-black dark:text-white !leading-snug tracking-tight font-medium">
        {frontmatter.title}
      </h1>
      <article className='markdown w-full mt-10 max-w-none'>
        <MDXComponent components={components}/>
      </article>
    </div>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  console.log(params.slug)
  const { slug } = params

  const { code, frontmatter } = await bundleMDX({
    file: path.join(root, `./posts/blog/${slug}.md`),
    cwd: path.join(root, './posts'),
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          { behavior: 'wrap', properties: { class: 'anchor' } },
        ],
      ]

      return options
    },
    esbuildOptions(options, frontmatter) {
      options.minify = false
      options.target = ['es2015']

      return options
    },
  })

  const { prev, next } = await getAdjacentPost(slug)

  console.log(frontmatter)

  return {
    props: {
      code,
      frontmatter: {
        ...frontmatter,
        date: dayjs(frontmatter.date).valueOf(),
      },
      prev: prev ? { link: `/posts/${prev.slug}`, title: prev.title } : null,
      next: next ? { link: `/posts/${next.slug}`, title: next.title } : null,
    },
  }
}

export async function getStaticPaths() {
  const allPostPaths = await getAllPostPaths()
  const paths = allPostPaths.map((path) => ({
    params: {
      slug: formatSlug(path),
    },
  }))
  console.log(paths)
  return {
    paths,
    fallback: false,
  }
}

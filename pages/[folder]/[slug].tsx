import { bundleMDX } from 'mdx-bundler'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import rehypeSlug from 'rehype-slug'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import path from 'path'
import dayjs from 'dayjs'
import remarkSideNote from '@/lib/remark-side-note'
import { formatSlug, getAdjacentPost, getAllPostPaths } from "@/lib/utils/post"
import PostLayout from "@/layouts/PostLayout"

const root = process.cwd()

export async function getStaticProps({ params }) {
  const { folder, slug } = params

  const { code, frontmatter } = await bundleMDX({
    file: path.join(root, `./posts/${folder}/${slug}.md`),
    cwd: path.join(root, './posts'),
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkDirective,
        remarkSideNote,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePrismPlus, { ignoreMissing: true }],
      ]

      return options
    },
    esbuildOptions(options, frontmatter) {
      options.minify = false
      options.target = ['es2015']

      return options
    },
  })

  const { prev, next } = await getAdjacentPost(slug, folder)

  return {
    props: {
      code,
      frontmatter: {
        ...frontmatter,
        slug: `${folder}/${slug}`,
        date: dayjs(frontmatter.date).valueOf(),
      },
      prev: prev
        ? { link: `${prev.slug}`, title: prev.title }
        : null,
      next: next
        ? { link: `${next.slug}`, title: next.title }
        : null,
    },
  }
}

export async function getStaticPaths() {
  const paths = []
  for (const folder of ['blog', 'remark']) {
    const postPaths = await getAllPostPaths(folder)
    const folderPaths = postPaths.map((path) => ({
      params: {
        folder,
        slug: formatSlug(path, folder),
      },
    }))
    paths.push(...folderPaths)
  }
  return {
    paths,
    fallback: false,
  }
}

export default PostLayout

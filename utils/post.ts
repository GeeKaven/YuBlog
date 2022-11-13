import glob from 'fast-glob'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import fs from 'fs'
import { PostFrontmatter } from '@/interfaces/post'

export async function getAllPostPaths() {
  return await glob('./posts/blog/**/*.md')
}

export function formatSlug(slug) {
  return slug.replace(/^\.\/posts\/blog\/|\.(mdx|md)$/g, '')
}

export async function getAllPostFrontMatter(): Promise<PostFrontmatter[]> {
  const files = await getAllPostPaths()
  console.log(files)
  const allFrontMatter: PostFrontmatter[] = await Promise.all(
    files.map(async (file) => {
      const source = fs.readFileSync(file, 'utf-8')
      const frontMatter = matter(source).data as PostFrontmatter
      if (frontMatter.draft !== true) {
        return {
          ...frontMatter,
          slug: formatSlug(file),
          date: dayjs(frontMatter.date).valueOf(),
        }
      }
    })
  )

  return allFrontMatter.sort((a, b) => b.date - a.date)
}

export async function getAdjacentPost(slug: string) {
  const posts = await getAllPostFrontMatter()
  const idx = posts.findIndex((post) => post.slug === slug)
  const prevPost =
    idx !== -1 && idx < posts.length - 1 ? posts[idx + 1] : undefined
  const nextPost = idx > 0 ? posts[idx - 1] : undefined

  return {
    prev: prevPost,
    next: nextPost,
  }
}

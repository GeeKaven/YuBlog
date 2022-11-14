import glob from 'fast-glob'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import fs from 'fs'

export async function getAllPostPaths(folder: string) {
  return await glob(`./posts/${folder}/**/*.md`)
}

export function formatSlug(slug, folder) {
  let reg = null
  if (folder === 'blog') {
    reg = /^\.\/posts\/blog\/|\.(mdx|md)$/g
  }
  if (folder === 'remark') {
    reg = /^\.\/posts\/remark\/|\.(mdx|md)$/g
  }

  return slug.replace(reg, '')
}

export async function getAllPostFrontMatter(
  folders: Array<string>
): Promise<PostFrontmatter[]> {
  const allFrontMatter: PostFrontmatter[] = []
  for (const folder of folders) {
    const files = await getAllPostPaths(folder.toString())

    const folderFrontMatter = await Promise.all(
      files.map(async (file) => {
        const source = fs.readFileSync(file, 'utf-8')
        const frontMatter = matter(source).data as PostFrontmatter
        if (frontMatter.draft !== true) {
          return {
            ...frontMatter,
            slug: file.replace(/^\.\/posts|\.(mdx|md)$/g, ''),
            date: dayjs(frontMatter.date).valueOf(),
          }
        }
      })
    )

    allFrontMatter.push(...folderFrontMatter)
  }

  return allFrontMatter.sort((a, b) => b.date - a.date)
}

export async function getAdjacentPost(slug: string, folder: string) {
  const posts = await getAllPostFrontMatter([folder])
  const idx = posts.findIndex((post) => post.slug === `/${folder}/${slug}`)
  const prevPost =
    idx !== -1 && idx < posts.length - 1 ? posts[idx + 1] : undefined
  const nextPost = idx > 0 ? posts[idx - 1] : undefined

  return {
    prev: prevPost,
    next: nextPost,
  }
}

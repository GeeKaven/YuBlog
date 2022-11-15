import { readFileSync } from 'fs'
import matter from 'gray-matter'
import {slug} from 'github-slugger'
import { getAllPostPaths, POST_FOLDER } from './post'

export async function getAllTags() {
  const files = []

  for (const folder of POST_FOLDER) {
    files.push(...(await getAllPostPaths(folder)))
  }

  const tagCount = {}

  files.forEach((file) => {
    const source = readFileSync(file, 'utf-8')
    const frontMatter = matter(source).data as PostFrontmatter
    if (frontMatter.tags && frontMatter.draft !== true) {
      frontMatter.tags.forEach((tag) => {
        const matteredTag = slug(tag)
        if (matteredTag in tagCount) {
          tagCount[matteredTag] += 1
        } else {
          tagCount[matteredTag] = 1
        }
      })
    }
  })

  return tagCount
}

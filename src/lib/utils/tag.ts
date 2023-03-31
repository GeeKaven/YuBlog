import { slug } from 'github-slugger'
import { getAllPosts } from './post'

export function getAllTags() {
  const posts = getAllPosts()

  const tagCount = {}

  posts.forEach((post) => {
    if (post.tags && post.draft !== true) {
      post.tags.forEach((tag) => {
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

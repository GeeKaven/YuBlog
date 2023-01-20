import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { allBlogs, allRemarks, Blog, Remark } from 'contentlayer/generated'

dayjs.extend(localizedFormat)

export const POST_FOLDER = ['blog', 'remark']
export const ARCHIVE_FOLDER = 'archives'
export const LIST_TITLE = {
  blog: '文章',
  remark: '随笔',
  archives: '归档'
}

export function formatSlug(sourceName) {
  return sourceName.replace(/\.(mdx|md)$/g, '')
}

function sortPost(posts: Blog[] | Remark[]) {
  return posts.sort((a,b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
}

export const POSTS_PER_PAGE = 5

export function getRecentPosts() {

  return {
    blogs: sortPost(allBlogs).slice(0, POSTS_PER_PAGE),
    remarks: sortPost(allRemarks).slice(0, POSTS_PER_PAGE)
  }
}

export function getAllPosts() {
  return [...allBlogs, ...allRemarks].sort((a,b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
}

export function getPostsByFolder(folder: string) {
  if (folder === 'blog') {
    return sortPost(allBlogs)
  } else if(folder === 'remark') {
    return sortPost(allRemarks)
  }

  return getAllPosts()
}

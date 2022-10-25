import { basename } from 'path'
import toc from 'hexo/lib/plugins/helper/toc'
import { url_for } from 'hexo-util'
import initHexo from '../hexo'

/**
 * 获取所有文章路径
 * @returns 
 */
export async function getAllPostSlugs() {
  const hexo = await initHexo()
  const posts = hexo.database.model('Post').find({}).sort('-date')
  return posts.map(post => basename(post.slug))
}

/**
 * 获取指定文章数据
 * @param slug 
 * @returns 
 */
export async function getPostBySlug(slug: string) {
  const hexo = await initHexo()
  const urlFor = url_for.bind(hexo)
  const post = hexo.database.model('Post').findOne({ slug })
  return {
    title: post.title,
    date: post.date.format('LL'),
    updated: post.updated.format('LL'),
    content: post.content,
    permalink: post.permalink,
    prev: post.prev
      ? { title: post.prev.title ?? '', url: urlFor(post.prev.path) }
      : null,
    next: post.next
      ? { title: post.next.title ?? '', url: urlFor(post.next.path) }
      : null,
    tags: post.tags.find({}).map(item => item.name),
    toc: post.toc? toc(post.content, {list_number: false, max_depth:4}): ''
  }
}

/**
 * 获取所有文章列表
 * @returns 
 */
export async function getAllPosts() {
  const hexo = await initHexo()
  const postList = hexo.database.model('Post').find({}).sort('-date')
  return postList.map((post) => {
    return {
      title: post.title,
      date: post.date.format('LL'),
      year: post.date.format('YYYY'),
      slug: post.slug
    }
  })
}

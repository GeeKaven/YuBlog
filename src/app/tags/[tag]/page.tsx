import { slug } from 'github-slugger'
import { getAllPosts } from '@/lib/utils/post'
import { getAllTags } from '@/lib/utils/tag'
import ListLayout from '@/layouts/ListLayout'

export const dynamicParams = false;

export function generateStaticParams() {
  const tags = getAllTags()

  return Object.keys(tags).map((tag) => ({ tag }))
}

export default function Tag({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag)

  const allPosts = getAllPosts()

  const filterPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => slug(t)).includes(tag)
  )
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  return (
    <ListLayout
      posts={filterPosts}
      displayPosts={filterPosts}
      title={title}
    ></ListLayout>
  )
}

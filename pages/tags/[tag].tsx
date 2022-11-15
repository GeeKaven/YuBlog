import { slug } from 'github-slugger'
import { getAllPostFrontMatter, POST_FOLDER } from '@/lib/utils/post'
import { getAllTags } from '@/lib/utils/tag'
import ListLayout from '@/layouts/ListLayout'

export async function getStaticPaths() {
  const tags = await getAllTags()

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { tag: string } }) {
  const { tag } = params
  const allPosts = await getAllPostFrontMatter(POST_FOLDER)
  const filterPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => slug(t)).includes(tag)
  )
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  return {
    props: { posts: filterPosts, displayPosts: filterPosts, title },
  }
}

export default ListLayout

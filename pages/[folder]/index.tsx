import Config from '@/data/config'
import { getAllPostFrontMatter } from '@/lib/utils/post'
import ListLayout from '@/layouts/ListLayout'

const POSTS_PER_PAGE = Config.POSTS_PER_PAGE

export const ALL_FOLDER = ['blog', 'remark', 'archives']

export async function getStaticProps({ params }) {
  const { folder } = params

  const posts = await getAllPostFrontMatter([folder])
  const displayPosts = posts.slice(0, POSTS_PER_PAGE)

  const pagination: PaginationType = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    path: folder
  }

  return {
    props: {
      posts,
      displayPosts,
      pagination,
      title: folder,
    },
  }
}

export function getStaticPaths() {
  return {
    paths: ALL_FOLDER.map((folder) => ({ params: { folder } })),
    fallback: false,
  }
}

export default ListLayout

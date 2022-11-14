import Config from '@/data/config'
import { getAllPostFrontMatter } from '@/lib/utils/post'
import ListLayout from '@/layouts/ListLayout'
import { ALL_FOLDER } from '../index'

const POSTS_PER_PAGE = Config.POSTS_PER_PAGE

export async function getStaticProps({ params }) {
  const { folder, page } = params

  const posts = await getAllPostFrontMatter([folder])
  const pageNumber = parseInt(page)
  const displayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const pagination: PaginationType = {
    currentPage: pageNumber,
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

export async function getStaticPaths() {
  const paths = []
  for (const folder of ALL_FOLDER) {
    const totalPosts = await getAllPostFrontMatter([folder])
    const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)

    const folderPaths = Array.from({ length: totalPages }, (_, i) => ({
      params: { folder, page: (i + 1).toString() },
    }))

    paths.push(...folderPaths)
  }

  return {
    paths,
    fallback: false,
  }
}

export default ListLayout

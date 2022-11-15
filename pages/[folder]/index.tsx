
import { ARCHIVE_FOLDER, getAllPostFrontMatter, LIST_TITLE, POST_FOLDER } from '@/lib/utils/post'
import ListLayout, { POSTS_PER_PAGE } from '@/layouts/ListLayout'

export async function getStaticProps({ params }) {
  const { folder } = params

  const queryFolder = []
  if (folder === 'archives') {
    queryFolder.push(...POST_FOLDER)
  } else{
    queryFolder.push(folder)
  }

  const posts = await getAllPostFrontMatter(queryFolder)
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
      title: LIST_TITLE[folder],
    },
  }
}

export function getStaticPaths() {
  return {
    paths: [...POST_FOLDER, ARCHIVE_FOLDER].map((folder) => ({ params: { folder } })),
    fallback: false,
  }
}

export default ListLayout

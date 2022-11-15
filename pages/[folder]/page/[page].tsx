import { getAllPostFrontMatter } from '@/lib/utils/post'
import ListLayout, { POSTS_PER_PAGE } from '@/layouts/ListLayout'
import { POST_FOLDER, ARCHIVE_FOLDER, LIST_TITLE } from '@/lib/utils/post'

export async function getStaticProps({ params }) {
  const { folder, page } = params

  const queryFolder = []
  if (folder === ARCHIVE_FOLDER) {
    queryFolder.push(...POST_FOLDER)
  } else{
    queryFolder.push(folder)
  }

  const posts = await getAllPostFrontMatter(queryFolder)
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
      title: LIST_TITLE[folder],
    },
  }
}

export async function getStaticPaths() {
  const paths = []
  const archivesPosts = []
  for (const folder of POST_FOLDER) {
    const totalPosts = await getAllPostFrontMatter([folder])
    const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)

    const folderPaths = Array.from({ length: totalPages }, (_, i) => ({
      params: { folder, page: (i + 1).toString() },
    }))

    paths.push(...folderPaths)
    archivesPosts.push(...totalPosts)
  }

  const archivesTotalPages = Math.ceil(archivesPosts.length / POSTS_PER_PAGE)
  const archivesPaths = Array.from({ length: archivesTotalPages }, (_, i) => ({
    params: { folder: ARCHIVE_FOLDER, page: (i + 1).toString() },
  }))
  paths.push(...archivesPaths)

  return {
    paths,
    fallback: false,
  }
}

export default ListLayout

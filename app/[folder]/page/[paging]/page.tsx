import { getAllPostFrontMatter } from '@/lib/utils/post'
import ListLayout, { POSTS_PER_PAGE } from '@/layouts/ListLayout'
import { POST_FOLDER, ARCHIVE_FOLDER, LIST_TITLE } from '@/lib/utils/post'
import { use } from 'react'

export const dynamicParams = false;

async function getPageList(folder, page) {
  const queryFolder = []
  if (folder === ARCHIVE_FOLDER) {
    queryFolder.push(...POST_FOLDER)
  } else {
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
    path: folder,
  }

  return {
    posts,
    displayPosts,
    pagination,
    title: LIST_TITLE[folder],
  }
}

export async function generateStaticParams() {
  const paths = []
  const archivesPosts = []
  for (const folder of POST_FOLDER) {
    const totalPosts = await getAllPostFrontMatter([folder])
    const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)

    const folderPaths = Array.from({ length: totalPages }, (_, i) => ({
      folder,
      paging: (i + 1).toString(),
    }))

    paths.push(...folderPaths)
    archivesPosts.push(...totalPosts)
  }

  const archivesTotalPages = Math.ceil(archivesPosts.length / POSTS_PER_PAGE)
  const archivesPaths = Array.from({ length: archivesTotalPages }, (_, i) => ({
    folder: ARCHIVE_FOLDER,
    paging: (i + 1).toString(),
  }))

  paths.push(...archivesPaths)

  return paths
}

export default function PageList({
  params,
}: {
  params: { folder: string; pagin: string }
}) {
  const { folder, pagin: page } = params
  const list = use(getPageList(folder, page))
  return (
    <ListLayout
      posts={list.posts}
      displayPosts={list.displayPosts}
      pagination={list.pagination}
      title={list.title}
    ></ListLayout>
  )
}

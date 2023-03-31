import { getPostsByFolder, POSTS_PER_PAGE } from '@/lib/utils/post'
import ListLayout from '@/layouts/ListLayout'
import { POST_FOLDER, ARCHIVE_FOLDER, LIST_TITLE } from '@/lib/utils/post'
import { Blog, Remark } from 'contentlayer/generated'
import { PageSEO } from '@/lib/utils/seo'
import SiteMeta from '@/data/siteMeta'

export const dynamicParams = false

function getPageList(folder, pageNumber) {
  const posts = getPostsByFolder(folder)

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

export function generateMetadata({ params }) {
  const { folder } = params

  return PageSEO(
    `${LIST_TITLE[folder]} - ${SiteMeta.author}`,
    SiteMeta.description
  )
}

export async function generateStaticParams() {
  const paths: Array<FolderType> = []
  const archivesPosts: Array<Blog | Remark> = []

  for (const folder of POST_FOLDER) {
    const totalPosts = getPostsByFolder(folder)
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
  params: { folder: string; paging: string }
}) {
  const { folder, paging } = params

  const list = getPageList(folder, paging)

  return (
    <ListLayout
      posts={list.posts}
      displayPosts={list.displayPosts}
      pagination={list.pagination}
      title={list.title}
    ></ListLayout>
  )
}

import {
  ARCHIVE_FOLDER,
  getPostsByFolder,
  LIST_TITLE,
  POSTS_PER_PAGE,
  POST_FOLDER,
} from '@/lib/utils/post'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/lib/utils/seo'
import SiteMeta from '@/data/siteMeta'

export const dynamicParams = false

function getList(folder: string) {
  const posts = getPostsByFolder(folder)
  const displayPosts = posts.slice(0, POSTS_PER_PAGE)

  const pagination: PaginationType = {
    currentPage: 1,
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
  return [...POST_FOLDER, ARCHIVE_FOLDER].map((folder) => ({ folder }))
}

export default function List({ params }: { params: { folder: string } }) {
  const list = getList(params.folder)

  return (
    <ListLayout
      posts={list.posts}
      displayPosts={list.displayPosts}
      pagination={list.pagination}
      title={list.title}
    ></ListLayout>
  )
}

import { use } from 'react'
import {
  ARCHIVE_FOLDER,
  getAllPostFrontMatter,
  LIST_TITLE,
  POST_FOLDER,
} from '@/lib/utils/post'
import ListLayout, { POSTS_PER_PAGE } from '@/layouts/ListLayout'

export const dynamicParams = false;

async function getList(folder) {
  const queryFolder = []
  if (folder === 'archives') {
    queryFolder.push(...POST_FOLDER)
  } else {
    queryFolder.push(folder)
  }

  const posts = await getAllPostFrontMatter(queryFolder)
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

export async function generateStaticParams() {
  return [...POST_FOLDER, ARCHIVE_FOLDER].map((folder) => ({ folder }))
}

export default function List({ params }: { params: { folder: string } }) {
  const list = use(getList(params.folder))

  return (
    <ListLayout
      posts={list.posts}
      displayPosts={list.displayPosts}
      pagination={list.pagination}
      title={list.title}
    ></ListLayout>
  )
}

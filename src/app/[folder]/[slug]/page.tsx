import { getPostsByFolder, POST_FOLDER } from '@/lib/utils/post'
import PostLayout from '@/layouts/PostLayout'
import { BlogSEO } from '@/lib/utils/seo'

export const dynamicParams = false

type ParamType = {
  params: { folder: string; slug: string }
}

export function generateMetadata({ params }: ParamType) {
  const { folder, slug } = params

  const posts = getPostsByFolder(folder)
  const post = posts.find((post) => post.slug === slug)

  return BlogSEO(post ? post.title : '', '', post ? post.slug : '', '')
}

export function generateStaticParams() {
  const paths: Array<FolderType> = []
  for (const folder of POST_FOLDER) {
    const posts = getPostsByFolder(folder)
    const folderPaths = posts.map((post) => ({
      folder,
      slug: post.slug,
    }))
    paths.push(...folderPaths)
  }

  console.log(paths)

  return paths
}

export default function Page({ params }: ParamType) {
  const { folder, slug } = params

  const posts = getPostsByFolder(folder)
  const post = posts.find((post) => post.slug === slug)
  const idx = posts.findIndex((post) => post.slug === slug)
  const prevPost =
    idx !== -1 && idx < posts.length - 1 ? posts[idx + 1] : undefined
  const prev = prevPost
    ? { link: `${prevPost.url}`, title: prevPost.title }
    : null
  const nextPost = idx > 0 ? posts[idx - 1] : undefined
  const next = nextPost
    ? { link: `${nextPost.url}`, title: nextPost.title }
    : null

  return <PostLayout post={post!} prev={prev} next={next}></PostLayout>
}

import { PostType } from '@/interfaces/post'
import { getAllPostSlugs, getPostBySlug } from '@/lib/api'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview }: Props) {
  return <></>
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug)
  return {
    props: {
      post,
    },
  }
}

export async function getStaticPaths() {
  const paths = await getAllPostSlugs()
  return {
    paths: paths.map((path) => {
      return {
        params: {
          slug: path,
        },
      }
    }),
    fallback: false,
  }
}

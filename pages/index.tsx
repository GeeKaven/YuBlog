import { getAllPosts } from '@/lib/api'
import { PostInfoType } from '@/interfaces/post'
import PostList from '@/components/post-list'

type Props = {
  allPosts: PostInfoType[]
}

export default function Index({ allPosts }: Props) {
  return (
    <div className='min-h-screen'>
      <PostList posts={allPosts} />
    </div>
  )
}

export const getStaticProps = async () => {
  const allPosts = await getAllPosts()
  console.log(allPosts)
  return {
    props: {
      allPosts,
    },
  }
}

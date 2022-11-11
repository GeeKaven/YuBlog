import { PostFrontmatter } from '@/interfaces/post'
import PostList from '@/components/post-list'
import { getAllPostFrontMatter } from 'utils/post'

type Props = {
  allPosts: PostFrontmatter[]
}

export default function Index({ allPosts }: Props) {
  return (
    <div className='min-h-screen'>
      <PostList posts={allPosts} />
    </div>
  )
}

export const getStaticProps = async () => {
  const allPosts: PostFrontmatter[] = await getAllPostFrontMatter()
  console.log(allPosts)
  return {
    props: {
      allPosts
    },
  }
}

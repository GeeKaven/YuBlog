import { PostFrontmatter } from '@/interfaces/post'
import dayjs from 'dayjs'
import Link from 'next/link'

type PostListProps = {
  posts: PostFrontmatter[]
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className='flex-1'>
      {posts.map((post, index) => (
        <div key={index}>
          {(index === 0 || dayjs(posts[index - 1].date).year() !== dayjs(post.date).year()) && (
            <h2 className="font-medium text-2xl sm:text-3xl before:content-['#_'] before:text-primary">
              {dayjs(post.date).year()}
            </h2>
          )}
          <article key={index} className='my-8'>
            <h3 className='font-medium text-lg sm:text-xl'>
              <Link href={`/posts/${post.slug}`} className='hover:text-primary'>
                {post.title}
              </Link>
            </h3>
            <span className='font-medium inline-block text-sm mt-2 opacity-50'>
              {dayjs(post.date).format('LL')}
            </span>
          </article>
        </div>
      ))}
    </div>
  )
}

export default PostList

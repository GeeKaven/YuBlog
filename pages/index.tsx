import dayjs from 'dayjs'
import Config from '@/data/config'
import { getAllPostFrontMatter } from '@/lib/utils/post'
import Link from 'next/link'
import SiteMeta from '@/data/siteMeta'
import { PageSEO } from '@/components/SEO'

const POSTS_PER_PAGE = Config.POSTS_PER_PAGE

type IndexProps = {
  blog: { list: PostFrontmatter[]; title: string }
  remark: { list: PostFrontmatter[]; title: string }
}

const List = ({
  title,
  list,
  folder,
}: {
  title: string
  list: PostFrontmatter[]
  folder: string
}) => (
  <div className='flex-1 mb-10'>
    <h1 className='text-3xl'>{title}</h1>
    <div className='flex-1'>
      {list &&
        list.length > 0 &&
        list.map((post, index) => (
          <article key={index} className='my-8'>
            <h3 className='font-medium text-lg sm:text-xl'>
              <Link href={`${post.slug}`} className='hover:text-primary-500'>
                {post.title}
              </Link>
            </h3>
            <span className='font-medium inline-block text-sm mt-2 opacity-50'>
              {dayjs(post.date).format('LL')}
            </span>
          </article>
        ))}
    </div>
    <div className='text-base font-medium leading-6'>
      <Link
        href={`/${folder}`}
        className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
        aria-label={`Read "${folder}"`}
      >
        查看全部
      </Link>
    </div>
  </div>
)

export default function Index({ blog, remark }: IndexProps) {
  return (
    <>
      <PageSEO title={SiteMeta.title} description={SiteMeta.description} />
      <div className=''>
        <List title={blog.title} list={blog.list} folder='blog' />
        <List title={remark.title} list={remark.list} folder='remark' />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const blogPosts = await getAllPostFrontMatter(['blog'])
  const remarkPosts = await getAllPostFrontMatter(['remark'])

  return {
    props: {
      blog: { list: blogPosts.slice(0, POSTS_PER_PAGE), title: '最新文章' },
      remark: { list: remarkPosts.slice(0, POSTS_PER_PAGE), title: '最新随笔' },
    },
  }
}

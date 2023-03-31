import SiteMeta from '@/data/siteMeta'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import useSWRInfinite from 'swr/infinite'
import { BgmStateAtom } from './BgmState'
import { Fetcher } from 'swr'

const bangumiUrl = SiteMeta.bangumi.apiUrl
const PAGE_SIZE = 12

const fetcher: Fetcher<BgmType, string> = (url) =>
  fetch(url).then((res) => res.json())

type BgmItemType = {
  date: string
  ep_status: number
  eps: number
  images: {
    common: string
    grid: string
    large: string
    medium: string
    small: string
  }
  name: string
  name_cn: string
  private: boolean
  rate: number
  subject_id: number
  subject_type: number
  summary: string
  total_episodes: number
  type: number
  updated_at: string
  vol_status: number
}

type BgmType = {
  data: BgmItemType[]
  total: number
}

const BgmList = () => {
  const [{ type }] = useAtom(BgmStateAtom)

  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    (pageIndex) => {
      return `${bangumiUrl}/v2/bangumi?type=${type}&page=${
        pageIndex + 1
      }&size=${PAGE_SIZE}`
    },
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (isLoading)
    return (
      <Image
        alt='Loading...'
        src='/images/loading.gif'
        className='my-auto mx-0'
        priority={true}
        width={800}
        height={400}
      />
    )

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.length < PAGE_SIZE)

  const bgmList: BgmItemType[] = []
  data?.forEach((item) => bgmList.push(...item.data))

  return (
    <>
      <div className='grid grid-cols-auto-fit-200 gap-3'>
        {bgmList.map((item) => {
          const totalEp = item.eps
          const ep = type === 'watched' ? totalEp : item.ep_status
          const percentage = (ep / totalEp) * 100
          const subjectUrl = `https://bgm.tv/subject/${item.subject_id}`
          return (
            <Link
              key={item.subject_id}
              href={subjectUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Link to ${item.name}`}
              className=''
            >
              <div className='h-full overflow-hidden border-2 rounded-md dark:border-gray-800 border-gray-100 hover:border-primary-500 dark:hover:border-primary-500'>
                <div className='h-80 relative'>
                  <Image
                    src={item.images.large}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes='33vw'
                  />
                </div>
                <div className='flex flex-col justify-center items-center p-2'>
                  <span className='block truncate max-w-full text-lg sm:text-xl font-bold'>
                    {item.name_cn || item.name}
                  </span>
                  <span className='block truncate max-w-full text-sm sm:text-base'>
                    {item.summary || item.name}
                  </span>
                  <div className='relative rounded-full mt-1 bg-primary-300 dark:bg-primary-400 w-full z-0'>
                    <div
                      className='absolute rounded-full h-full left-0 top-0 -z-[1] bg-primary-500 dark:bg-primary-600'
                      style={{ width: `${percentage}%` }}
                    ></div>
                    <div className='text-center text-white'>
                      进度：{ep} / {totalEp == 0 ? '??' : totalEp}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
        style={isLoadingMore ? { backgroundColor: '#6b7280' } : {}}
        className={classNames(
          `block w-24 mt-4 mx-auto py-2 px-4 font-semibold  text-white text-center
       bg-primary-400 hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600
        rounded-full shadow-md 
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75`,
          {
            hidden: isReachingEnd,
          }
        )}
      >
        {isLoadingMore ? '加载中' : '加载更多'}
      </button>
    </>
  )
}

export default BgmList

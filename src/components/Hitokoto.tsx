import useSWR from 'swr'
import SiteMeta from '@/data/siteMeta'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Hitokoto = () => {
  const { data, error, isLoading } = useSWR(
    'https://v1.hitokoto.cn?c=a&encode=json&charset=utf-8&c=b',
    fetcher
  )

  return (
    <div className='flex flex-col'>
      <div className='text-3xl'>『</div>
      <div className='text-center px-12 text-2xl text-slate-500 dark:text-slate-300'>
        {error
          ? SiteMeta.bangumi.quote
          : isLoading
          ? 'Loading'
          : data?.hitokoto}
      </div>
      <div className='text-3xl text-right'>』</div>
      <div className='mt-4 mr-2 dark:text-gray-400 text-gray-500 text-xl text-right'>
        {error
          ? `—— 「${SiteMeta.bangumi.from}」`
          : isLoading
          ? 'Loading'
          : `——  ${data?.from_who ? data?.from_who : ''}「${data?.from}」`}
      </div>
    </div>
  )
}

export default Hitokoto

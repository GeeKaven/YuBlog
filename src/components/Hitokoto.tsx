import useSWR from 'swr'
import SiteMeta from '@/siteMeta'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Hitokoto = () => {
  const { data, error, isLoading } = useSWR(
    'https://v1.hitokoto.cn?c=a&encode=json&charset=utf-8&c=b',
    fetcher
  )

  return (
    <div className='flex flex-col'>
      <div className='text-3xl'>『</div>
      <div className='text-center px-12 text-2xl text-slate-700 dark:text-slate-300'>
        {error
          ? SiteMeta.bangumi.quote
          : isLoading
          ? ' '
          : data?.hitokoto}
      </div>
      <div className='text-3xl text-right'>』</div>
      <div className='mt-4 mr-2 dark:text-gray-300 text-gray-700 text-xl text-right'>
        {error
          ? `—— 「${SiteMeta.bangumi.from}」`
          : isLoading
          ? ' '
          : `——  ${data?.from_who ? data?.from_who : ''}「${data?.from}」`}
      </div>
    </div>
  )
}

export default Hitokoto

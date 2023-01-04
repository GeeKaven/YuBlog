import SiteMeta from '@/data/siteMeta'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import useSWR from 'swr'
import { BgmStateAtom } from './BgmState'

const fetcher = (url) => fetch(url).then((res) => res.json())
const bangumiUrl = SiteMeta.bangumi.apiUrl

const types = {
  want: '想看',
  watching: '在看',
  watched: '看过',
}

const BgmTab = () => {
  const [{ type }, setBgmState] = useAtom(BgmStateAtom)

  const { data, error, isLoading} = useSWR(`${bangumiUrl}/bangumi_total`, fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className='flex gap-2 text-lg my-6'>
      {Object.keys(data).map((key) => {
        const value = data[key]
        return (
          <span
            key={key}
            onClick={() => setBgmState({ type: key })}
            className={classNames('px-2 py-[2px] rounded-md cursor-pointer', { 'text-white dark:bg-primary-500 bg-primary-400': key === type })}
          >
            {types[key]}({value})
          </span>
        )
      })}
    </div>
  )
}

export default BgmTab

'use client'

import Hitokoto from './Hitokoto'
import BgmList from './BgmList'
import BgmTab from './BgmTab'
const Bangumi = () => {
  return (
    <div className='mt-8'>
      <Hitokoto />
      <BgmTab />
      <BgmList />
    </div>
  )
}

export default Bangumi

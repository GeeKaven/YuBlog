import React from 'react'
import SiteMeta from '@/data/siteMeta'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='flex items-center my-12 sm:my-16'>
      {/* 头像 */}
      {SiteMeta.avatar && (
        <div className='relative'>
          <Image
            src={SiteMeta.avatar}
            alt='avatar'
            width={96}
            height={96}
            className='object-cover rounded-full shadow-lg'
          />
          <div className='absolute inset-0 ring-1 ring-inset rounded-full ring-black/10 dark:ring-white/10' />
        </div>
      )}
      {/* 信息 */}
      <div className='flex flex-col justify-between space-y-2 ml-6'>
        <h1 className='text-3xl sm:text-4xl font-medium bg-gradient-to-br from-pink-400 to-sky-500 bg-clip-text text-transparent'>
          {SiteMeta.title}
        </h1>
        <span className='text-gray-500 dark:text-gray-400'>{SiteMeta.description}</span>
        <div className='flex items-center gap-3'>
          {SiteMeta.socials && SiteMeta.socials.map(social => (
            <Link key={social.label} href={social.link} aria-label={`Read more about ${social.label}`}>{social.icon}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero

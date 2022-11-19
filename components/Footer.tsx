import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='flex flex-col items-center mt-16 mb-6 text-sm'>
        <span className='font-medium'>
          Powered by{' '}
          <a href='https://nextjs.org/' className='text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-500'>
            Next.js
          </a>{' '}
          • Deployed on{' '}
          <a href='https://vercel.com/' className='text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-500'>
            Vercel
          </a>
        </span>
        <div className='mt-2 text-gray-500 dark:text-gray-400'>
          &copy;{new Date().getFullYear()}&nbsp;GeeKaven
        </div>
      </div>
    </footer>
  )
}

export default Footer

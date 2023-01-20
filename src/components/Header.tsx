import HeaderNav from '@/data/headerNav'
import SiteMeta from '@/data/siteMeta'
import Image from 'next/image'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'

type HeaderProps = {
  onToggleNav: () => void
}

const Header = ({ onToggleNav }: HeaderProps) => {
  return (
    <header className='w-full h-[70px] sm:border-b border-white/50 dark:border-gray-900/50 backdrop-blur-md supports-backdrop-blur:bg-white/95 fixed top-0 z-40 py-[10px] dark:bg-gray-900/75 bg-white '>
      <div className='flex items-center justify-between mx-auto max-w-3xl px-4 sm:px-6'>
        <Link href='/' aria-label={SiteMeta.headerTitle}>
          <div className='flex items-center justify-between'>
            <div className='mr-3'>
              <Image
                className='sm:inline-block mr-4 cursor-pointer dark:invert'
                width={48}
                height={48}
                src='/logo.svg'
                alt='logo'
              />
            </div>
          </div>
        </Link>
        <div className='flex items-center text-base leading-5'>
          <div className='hidden sm:block'>
            {HeaderNav.map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                className='font-medium text-lg mx-1 py-2 px-4 rounded-lg leading-loose transition hover:bg-slate-200/50 dark:hover:bg-zinc-800/50'
              >
                {nav.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <button
            type='button'
            className='ml-2 mr-1 h-8 w-8 rounded sm:hidden'
            aria-label='Toggle Menu'
            onClick={onToggleNav}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='text-gray-900 dark:text-gray-100'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

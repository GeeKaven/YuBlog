import React from 'react'
import Link from 'next/link'

type PaginationProps = PaginationType

const Pagination = ({ totalPages, currentPage, path }: PaginationProps) => {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className='pt-6 pb-8'>
      <nav className='flex justify-between'>
        {!prevPage && (
          <button
            className='cursor-auto disabled:opacity-50'
            disabled={!prevPage}
          >
            上一页
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1 ? `/${path}` : `/${path}/page/${currentPage - 1}`
            }
          >
            <button>上一页</button>
          </Link>
        )}
        <span>
          {currentPage} / {totalPages}
        </span>
        {!nextPage && (
          <button
            className='cursor-auto disabled:opacity-50'
            disabled={!nextPage}
          >
            下一页
          </button>
        )}
        {nextPage && <Link href={`/${path}/page/${currentPage + 1}`}>下一页</Link>}
      </nav>
    </div>
  )
}

export default Pagination

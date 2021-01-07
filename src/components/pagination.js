import { Link } from 'gatsby'
import React from 'react'

const Pagination = ({ isPost, prevText, prevLink, nextText, nextLink }) => {
  if (isPost) {
    return (
      <div className="flex justify-between py-8">
        <div className="prev-post">
          {prevLink && (
            <Link to={prevLink} className="post-title prev">
              {prevText}
            </Link>
          )}
        </div>

        <div className="next-post">
          {nextLink && (
            <Link to={nextLink} className="post-title next">
              {nextText}
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="pagination-container animate__animated animate__fadeIn">
      {prevLink && (
        <Link to={prevLink} className="page-btn">
          <i className="ri-arrow-left-line"></i>
          {prevText}
        </Link>
      )}
      {nextLink && (
        <Link to={nextLink} className="page-btn">
          {nextText}
          <i className="ri-arrow-right-line"></i>
        </Link>
      )}
    </div>
  )
}

Pagination.defaultProps = {
  isPost: false,
  prevText: '上一页',
  nextText: '下一页',
}

export default Pagination

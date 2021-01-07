import React from 'react'

const Page = ({ page, children }) => {
  return (
    <div className="content-wrapper py-32 lg:p-8 lg:w-3/4 post-detail animate__animated animate__fadeIn">
      <h1 className="text-3xl font-bold lg:mt-16">{page.frontmatter.title}</h1>
      {page.frontmatter.image && (
        <img
          className="post-feature-image rounded-lg mx-auto my-4"
          src={page.frontmatter.image}
          alt=""
        />
      )}
      <div className="post-content yue">{children}</div>
    </div>
  )
}

export default Page

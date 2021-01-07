import { Link } from 'gatsby'
import React from 'react'

const PageList = ({ posts, children }) => {
  return (
    <div className="content-wrapper py-32 lg:p-8 lg:w-3/4">
      <h2 className="latest-article text-lg text-gray-700 mb-8">最新文章</h2>
      {posts.map(({ node }, index) => (
        <section
          key={node.fields.slug}
          className="post-item md:flex pb-12 animate__animated animate__fadeIn"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {node.frontmatter.image && (
            <Link
              to={node.fields.slug}
              className="feature-image-wrapper bg-gray-100 rounded-lg flex-shrink-0 mr-8 w-full h-56 h-32 md:w-56 md:h-40"
            >
              <div
                className="post-feature-image lazy w-full h-56 h-32 md:w-56 md:h-40"
                style={{ backgroundImage: `url(${node.frontmatter.image})` }}
              ></div>
            </Link>
          )}
          <div className="content">
            <Link to={node.fields.slug} aria-label={node.frontmatter.title}>
              <h2 className="post-title text-xl font-extrabold mt-5 md:mt-0">
                {node.frontmatter.title}
              </h2>
            </Link>
            <div className="post-abstract text-gray-700 font-light my-4">
              {node.frontmatter.description || node.excerpt}
            </div>
            <div className="text-gray-400 text-sm font-light">
              {node.frontmatter.date}
            </div>
          </div>
        </section>
      ))}
      {children}
    </div>
  )
}

export default PageList

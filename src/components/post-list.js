import { Link } from 'gatsby'
import React from 'react'

const PageList = ({ posts }) => {
  return (
    <div>
      {posts.map(({ node }, index) => (
        <section
          key={node.fields.slug}
          className="post-item md:flex pb-12 animated fadeIn"
          style={{ animationDelay: `${index * 2}s` }}
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
            <Link to={node.fields.slug}>
              <h2 className="post-title text-xl font-extrabold mt-5 md:mt-0">
                {node.frontmatter.title}
              </h2>
            </Link>
            <div className="post-abstract text-gray-700 font-light my-4">
              {node.frontmatter.description}
            </div>
            <div className="text-gray-400 text-sm font-light">
              {node.frontmatter.date}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default PageList

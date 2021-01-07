import { Link } from 'gatsby'
import React from 'react'

const Archives = ({ posts }) => {

  let yearsMap = new Map()
  posts.forEach(({ node }) => {
    const year = node.frontmatter.date.substring(0, 4)
    if (!yearsMap.has(year)) {
      yearsMap.set(year, [])
    }
    yearsMap.get(year).push(node)
  })

  return (
    <div className="content-wrapper py-32 lg:p-8 lg:w-3/4">
      <h2 className="text-lg text-gray-700 mb-8">文章归档</h2>
      <div className="archives-container">
        {Array.from(yearsMap).map(([year, nodes]) => (
          <React.Fragment key={year}>
            <h2 className="text-gray-600 py-4 animate__animated animate__fadeIn">
              {year}
            </h2>
            {nodes.map(node => (
              <React.Fragment key={node.fields.slug}>
                <Link to={node.fields.slug}>
                  <h2 className="inline-block font-bold text-lg post-title animate__animated animate__fadeIn">
                    {node.frontmatter.title}
                  </h2>
                </Link>
                <div
                  className="text-sm font-light mt-3 mb-6 text-gray-400 animate__animated animate__fadeInDown"
                  style={{ animationDelay: `0.4s` }}
                >
                  {node.frontmatter.date}
                </div>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default Archives

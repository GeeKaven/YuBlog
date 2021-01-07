import React from 'react'
import SEO from './seo'

const Layout = ({ title, children }) => {
  return (
    <div className="layout">
      <SEO title={title} />
      {children}
    </div>
  )
}

export default Layout

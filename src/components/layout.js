import React from 'react'
import { Helmet } from 'react-helmet'
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

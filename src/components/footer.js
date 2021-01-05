import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

const Footer = ({ contentHtml }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          footerHTML
        }
      }
    }
  `)

  console.log(site)

  const footerHtml = contentHtml || site.siteMetadata.footerHTML

  return (
    <footer className="footer">
      <div
        className="copyright"
        dangerouslySetInnerHTML={{ __html: footerHtml }}
      ></div>
    </footer>
  )
}

export default Footer

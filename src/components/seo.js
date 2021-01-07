/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ description, lang, meta, title, socialImage }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
            cdn
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const cdn = site.siteMetadata.cdn
  const defaultTitle = site.siteMetadata?.title
  const metaImage = socialImage || site.siteMetadata.image

  return (
    <Helmet
      htmlAttributes={{
        lang: lang || site.siteMetadata.language,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
      ].concat(meta)}
      link={cdn.map(item => {
        return { rel: `stylesheet`, href: item }
      })}
    />
  )
}

SEO.defaultProps = {
  lang: ``,
  meta: [],
  description: ``,
}

export default SEO

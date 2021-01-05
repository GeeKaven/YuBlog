import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import Menu from './menu'
import SocialLink from './social-link'
import Toc from './toc'

const SideBar = ({ isPostPage, toc }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            social {
              github
              twitter
              mail
            }
            sidebarMenu {
              label
              url
            }
            siteUrl
            image
            description
          }
        }
      }
    `
  )

  return (
    <div id="sidebar" className="sidebar-wrapper lg:static lg:w-1/4">
      <div className="lg:sticky top-0">
        <div className="sidebar-content">
          <div className="flex lg:block p-4 lg:px-0 items-center fixed lg:static lg:block top-0 right-0 left-0 bg-white z-50">
            <Link to="/">
              <img
                className="animated fadeInLeft avatar rounded-lg mx-4 lg:mt-12 lg:mx-0 mt-0 lg:w-24 lg:h-24 w-12 w-12"
                src={site.siteMetadata.image}
                alt=""
              />
            </Link>
            <h1
              className="animated fadeInLeft lg:text-4xl font-extrabold lg:mt-8 mt-0 text-xl"
              style={{ animationDelay: `0.2s` }}
            >
              {site.siteMetadata.title}
            </h1>
          </div>
          <SocialLink
            social={site.siteMetadata.social}
            description={site.siteMetadata.description}
          />
          <Menu menu={site.siteMetadata.sidebarMenu} />
          {isPostPage && <Toc toc={toc} />}
        </div>
      </div>
    </div>
  )
}

SideBar.defaultProps = {
  isPostPage: false,
}

export default SideBar

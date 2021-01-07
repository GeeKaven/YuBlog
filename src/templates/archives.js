import { graphql } from 'gatsby'
import React from 'react'
import Archives from '../components/archives'
import Layout from '../components/layout'
import Main from '../components/main'
import SideBar from '../components/sidebar'

const ArchivesTemplate = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title="Archive" description="文章归档">
      <Main>
        <SideBar />
        <Archives posts={posts}></Archives>
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query($dateFormat: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { layout: { ne: "page" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: $dateFormat)
          }
        }
      }
    }
  }
`

export default ArchivesTemplate

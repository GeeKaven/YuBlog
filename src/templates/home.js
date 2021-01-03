import React from 'react'
import { graphql } from 'gatsby'
import Main from '../components/main'
import PostList from '../components/post-list'
import SideBar from '../components/sidebar'
import Layout from '../components/layout'

const HomeTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Main>
        <SideBar isPostPage={false} />
        <PostList posts={posts} />
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query HomeTemplate($limit: Int!, $skip: Int!, $dateFormat: String!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
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
            image
            description
            date(formatString: $dateFormat)
          }
        }
      }
    }
  }
`

export default HomeTemplate

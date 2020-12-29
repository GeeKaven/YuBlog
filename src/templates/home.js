import React from 'react'
import { graphql } from 'gatsby'
import Main from '../components/main'
import PostList from '../components/post-list'

const HomeTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Main>
      <PostList posts={posts}></PostList>
    </Main>
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

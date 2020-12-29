import React from 'react'
import { Link, graphql } from 'gatsby'
import Main from '../components/main'
import Post from '../components/post'


const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark

  return (
    <Main>
      <Post post={post}></Post>
    </Main>
  )
}

export const query = graphql`
  query PostBySlug($slug: String!, $dateFormat: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: $dateFormat)
        description
        image
        layout
        title
        tags
      }
    }
  }
`

export default BlogPostTemplate

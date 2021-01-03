import React from 'react'
import { Link, graphql } from 'gatsby'
import Main from '../components/main'
import Post from '../components/post'
import Layout from '../components/layout'
import SideBar from '../components/sidebar'

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <Main>
        <SideBar isPostPage={true} />
        <Post post={post} />
      </Main>
    </Layout>
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

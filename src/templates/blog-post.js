import React from 'react'
import { Link, graphql } from 'gatsby'
import Main from '../components/main'
import Post from '../components/post'
import Layout from '../components/layout'
import SideBar from '../components/sidebar'
import Pagination from '../components/pagination'

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark

  const { previous, next } = pageContext
  return (
    <Layout title={post.frontmatter.title}>
      <Main>
        <SideBar isPostPage={true} toc={post.tableOfContents} />
        <Post post={post}>
          <Pagination
            isPost={true}
            prevLink={previous && previous.fields.slug}
            prevText={previous && previous.frontmatter.title}
            nextLink={next && next.fields.slug}
            nextText={next && next.frontmatter.title}
          />
        </Post>
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query PostBySlug($slug: String!, $dateFormat: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 120)
      fields {
        slug
      }
      tableOfContents(maxDepth: 3)
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

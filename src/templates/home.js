import React from 'react'
import { graphql } from 'gatsby'
import Main from '../components/main'
import PostList from '../components/post-list'
import SideBar from '../components/sidebar'
import Layout from '../components/layout'
import Pagination from '../components/pagination'
import Footer from '../components/footer'

const HomeTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { currentPage, totalPage } = pageContext

  return (
    <Layout title="Posts">
      <Main>
        <SideBar />
        <PostList posts={posts}>
          <Pagination
            prevLink={
              currentPage !== 1 &&
              (currentPage === 2 ? '/' : `/page/${currentPage - 1}`)
            }
            nextLink={currentPage < totalPage && `/page/${currentPage + 1}`}
          />
          <Footer />
        </PostList>
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
          excerpt(pruneLength: 120)
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

import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import Main from '../components/main'
import Page from '../components/page'
import SideBar from '../components/sidebar'

const PageTemplate = ({ data }) => {
  const page = data.markdownRemark

  return (
    <Layout>
      <Main>
        <SideBar />
        <Page page={page}>
          <div
            dangerouslySetInnerHTML={{ __html: page.frontmatter.html }}
          ></div>
        </Page>
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        description
        image
        title
      }
    }
  }
`

export default PageTemplate

import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'

// Export Template for use in CMS preview
export const PracticePageTemplate = ({
  title,
  excerpt,
  featuredImage,
  body,
}) => (
  <main>
    <PageHeader
      title={title}
      excerpt={excerpt}
      backgroundImage={featuredImage}
    />
    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
  </main>
)

const PracticePage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <PracticePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default PracticePage

export const pageQuery = graphql`
  query PracticePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
        html
      frontmatter {
        title
        template
        featuredImage
        excerpt
      }
    }
  }
`

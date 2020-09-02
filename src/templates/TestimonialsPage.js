import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'

// Export Template for use in CMS preview
export const TestimonialsPageTemplate = ({
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

const TestimonialsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <TestimonialsPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default TestimonialsPage

export const pageQuery = graphql`
  query TestimonialsPage($id: String!) {
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

import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import FormReferrals from '../components/FormReferrals'
import Layout from '../components/Layout'

// Export Template for use in CMS preview
export const ReferralsPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  body
}) => (
  <main className="DefaultPage">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
    <section className="section">
      <div className="container">
        <FormReferrals />
      </div>
    </section>
  </main>
)

const ReferralsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ReferralsPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default ReferralsPage

export const pageQuery = graphql`
  query ReferralsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
  }
`

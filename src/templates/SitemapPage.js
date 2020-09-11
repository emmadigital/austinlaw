import React from 'react'
import { graphql, Link } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import Sitemap from '../components/Sitemap'


// Export Template for use in CMS preview
export const SitemapPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  body
}) => (
  <main className="MeetUsPage">
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
      <Sitemap />
      </div>
    </section>
  </main>
)

const SitemapPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <SitemapPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default SitemapPage

export const pageQuery = graphql`
  query SitemapPage($id: String!) {
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

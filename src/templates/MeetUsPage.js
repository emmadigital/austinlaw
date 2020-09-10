import React from 'react'
import { graphql, Link } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'

// Export Template for use in CMS preview
export const MeetUsPageTemplate = ({
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
      <Link className="SinglePost--BackButton" to="/meet-us/">
          <ChevronLeft /> BACK
        </Link>
        <br /> 
        <Content source={body} />
      </div>
    </section>
  </main>
)

const MeetUsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <MeetUsPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default MeetUsPage

export const pageQuery = graphql`
  query MeetUsPage($id: String!) {
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

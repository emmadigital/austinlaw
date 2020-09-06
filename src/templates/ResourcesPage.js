import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import GuideGrid from '../components/GuideGrid'
import '../components/Gallery.css'


// Export Template for use in CMS preview
export const ResourcesPageTemplate = ({
  title,
  excerpt,
  featuredImage,
  body,
  guides,
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
    <section className="section">
      <div className="container">
    {guides === null ? (
      <div></div>
    ) : <GuideGrid gridItems={guides.items} /> 
    }
      </div>
    </section>
  </main>
)

const ResourcesPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ResourcesPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ResourcesPage

export const pageQuery = graphql`
  query ResourcesPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
        html
      frontmatter {
        title
        template
        featuredImage
        excerpt
        guides {
          items {
            blurbsheading
            link
            text
            image {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`

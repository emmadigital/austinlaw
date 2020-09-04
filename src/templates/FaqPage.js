import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'

// Export Template for use in CMS preview
export const FaqPageTemplate = ({
  title,
  excerpt,
  featuredImage,
  body,
}) => (
  <main>
    <PageHeader
      title={title}
      excerpt={excerpt}
      backgroundImage= {featuredImage.replace(new RegExp("../../static"), '')}
    />
    <section className="section">
      <div className="container">
      <img src={featuredImage.replace(new RegExp("../../static"), '')} alt="rating"
      style={{
        borderRadius: '50%',
          width: '150px',
          height: '150px',
          margin: '5px auto 10px',
          transition: '.3s border linear',
      }}
      />        
        <div>      
          <h1>{title}</h1>
        </div>
        <Content source={body} />
      </div>
    </section>
  </main>
)

const FaqPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <FaqPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default FaqPage

export const pageQuery = graphql`
  query FaqPage($id: String!) {
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

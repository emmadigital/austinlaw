import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import FaqCategoriesNav from '../components/FaqCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {faq} object
 */
export const byDate = faq => {
  const now = Date.now()
  return faq.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {faq} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (faq, title, contentType) => {
  const isCategory = contentType === 'faqCategory'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? faq.filter(byCategory) : faq
}

// Export Template for use in CMS preview
export const FaqIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  faq = [],
  faqCategory = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
        faq && !!faq.length
          ? byCategory(byDate(faq), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
          post.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="Blog">
          <PageHeader
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!faqCategory.length && (
            <section className="section thin">
              <div className="container">
                <FaqCategoriesNav enableSearch categories={faqCategory} />
              </div>
            </section>
          )}

          {!!faq.length && (
            <section className="section">
              <div className="container">
                <PostSection blog={filteredPosts} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default BlogIndex for front-end
const FaqIndex = ({ data: { page, faq, faqCategory } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <FaqIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      faq={faq.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      faqCategory={faqCategory.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default FaqIndex

export const pageQuery = graphql`
  ## Query for FaqIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query FaqIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        excerpt
        template
        subtitle
        featuredImage
      }
    }

    faq: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "faq" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    faqCategory: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "faqCategory" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

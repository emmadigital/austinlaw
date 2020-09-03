import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import TestimonialsSection from '../components/TestimonialsSection'
import TestimonialsCategoriesNav from '../components/TestimonialsCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {testimonials} object
 */
export const byDate = testimonials => {
  const now = Date.now()
  return testimonials.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {testimonials} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (testimonials, title, contentType) => {
  const isCategory = contentType === 'testimonialsCategory'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? testimonials.filter(byCategory) : testimonials
}

// Export Template for use in CMS preview
export const TestimonialsIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  testimonials = [],
  testimonialsCategory = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
      testimonials && !!testimonials.length
          ? byCategory(byDate(testimonials), title, contentType)
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

          {!!testimonialsCategory.length && (
            <section className="section thin">
              <div className="container">
                <TestimonialsCategoriesNav enableSearch categories={testimonialsCategory} />
              </div>
            </section>
          )}

          {!!testimonials.length && (
            <section className="section">
              <div className="container">
                <TestimonialsSection blog={filteredPosts} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default BlogIndex for front-end
const TestimonialsIndex = ({ data: { page, testimonials, testimonialsCategory } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <TestimonialsIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      testimonials={testimonials.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      testimonialsCategory={testimonialsCategory.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default TestimonialsIndex

export const pageQuery = graphql`
  ## Query for TestimonialsIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query TestimonialsIndex($id: String!) {
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

    testimonials: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "testimonials" } } }
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
    testimonialsCategory: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "testimonialsCategory" } } }
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

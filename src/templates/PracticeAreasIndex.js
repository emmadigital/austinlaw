import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import PracticeCategoriesNav from '../components/PracticeCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {practiceAreas} object
 */
export const byDate = practiceAreas => {
  const now = Date.now()
  return practiceAreas.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {practiceAreas} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (practiceAreas, title, contentType) => {
  const isCategory = contentType === 'practiceCategory'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? practiceAreas.filter(byCategory) : practiceAreas
}

// Export Template for use in CMS preview
export const PracticeAreasIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  practiceAreas = [],
  practiceCategory = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
        practiceAreas && !!practiceAreas.length
          ? byCategory(byDate(practiceAreas), title, contentType)
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

          {!!practiceCategory.length && (
            <section className="section thin">
              <div className="container">
                <PracticeCategoriesNav enableSearch categories={practiceCategory} />
              </div>
            </section>
          )}

          {!!practiceAreas.length && (
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
const PracticeAreasIndex = ({ data: { page, practiceAreas, practiceCategory } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <PracticeAreasIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      practiceAreas={practiceAreas.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      practiceCategory={practiceCategory.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default PracticeAreasIndex

export const pageQuery = graphql`
  ## Query for PracticeAreasIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query PracticeAreasIndex($id: String!) {
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

    practiceAreas: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "practiceAreas" } } }
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
    practiceCategory: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "practiceCategory" } } }
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

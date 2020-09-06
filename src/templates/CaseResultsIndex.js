import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import CaseResultsCategoriesNav from '../components/CaseResultsCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {caseResults} object
 */
export const byDate = caseResults => {
  const now = Date.now()
  return caseResults.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {caseResults} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (caseResults, title, contentType) => {
  const isCategory = contentType === 'caseresultsCategory'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? caseResults.filter(byCategory) : caseResults
}

// Export Template for use in CMS preview
export const CaseResultsIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  caseResults = [],
  caseresultsCategory = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
      caseResults && !!caseResults.length
          ? byCategory(byDate(caseResults), title, contentType)
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

          {!!caseresultsCategory.length && (
            <section className="section thin">
              <div className="container">
                <CaseResultsCategoriesNav enableSearch categories={caseresultsCategory} />
              </div>
            </section>
          )}

          {!!caseResults.length && (
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
const CaseResultsIndex = ({ data: { page, caseResults, caseresultsCategory } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <CaseResultsIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      caseResults={caseResults.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      caseresultsCategory={caseresultsCategory.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default CaseResultsIndex

export const pageQuery = graphql`
  ## Query for CaseResultsIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query CaseResultsIndex($id: String!) {
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

    caseResults: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "caseResults" } } }
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
    caseresultsCategory: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "caseresultsCategory" } } }
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

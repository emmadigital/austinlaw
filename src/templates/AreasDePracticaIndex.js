import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import PracticaCategoriesNav from '../components/PracticaCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {areasdePractica} object
 */
export const byDate = areasdePractica => {
  const now = Date.now()
  return areasdePractica.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {areasdePractica} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (areasdePractica, title, contentType) => {
  const isCategory = contentType === 'areasdePracticaCategory'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? areasdePractica.filter(byCategory) : areasdePractica
}

// Export Template for use in CMS preview
export const AreasDePracticaIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  areasdePractica = [],
  areasdePracticaCategory = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
      areasdePractica && !!areasdePractica.length
          ? byCategory(byDate(areasdePractica), title, contentType)
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

          {!!areasdePracticaCategory.length && (
            <section className="section thin">
              <div className="container">
                <PracticaCategoriesNav enableSearch categories={areasdePracticaCategory} />
              </div>
            </section>
          )}

          {!!areasdePractica.length && (
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
const AreasDePracticaIndex = ({ data: { page, areasdePractica, areasdePracticaCategory } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <AreasDePracticaIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      areasdePractica={areasdePractica.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      areasdePracticaCategory={areasdePracticaCategory.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default AreasDePracticaIndex

export const pageQuery = graphql`
  ## Query for AreasDePracticaIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query AreasDePracticaIndex($id: String!) {
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

    areasdePractica: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "areasdePractica" } } }
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
    areasdePracticaCategory: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "areasdePracticaCategory" } } }
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

import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import ResourcesCategoriesNav from '../components/ResourcesCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {resources} object
 */
export const byDate = resources => {
  const now = Date.now()
  return resources.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {resources} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (resources, title, contentType) => {
  const isCategory = contentType === 'resourcesCategory'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? resources.filter(byCategory) : resources
}

// Export Template for use in CMS preview
export const ResourcesIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  resources = [],
  resourcesCategory = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
      resources && !!resources.length
          ? byCategory(byDate(resources), title, contentType)
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

          {!!resourcesCategory.length && (
            <section className="section thin">
              <div className="container">
                <ResourcesCategoriesNav enableSearch categories={resourcesCategory} />
              </div>
            </section>
          )}

          {!!resources.length && (
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
const ResourcesIndex = ({ data: { page, resources, resourcesCategory } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ResourcesIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      resources={resources.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      resourcesCategory={resourcesCategory.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default ResourcesIndex

export const pageQuery = graphql`
  ## Query for ResourcesIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ResourcesIndex($id: String!) {
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

    resources: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "resources" } } }
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
    resourcesCategory: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "resourcesCategory" } } }
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

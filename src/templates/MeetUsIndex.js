import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import MeetusCategoriesNav from '../components/MeetusCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {meetus} object
 */
export const byDate = meetus => {
  const now = Date.now()
  return meetus.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {meetus} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (meetus, title, contentType) => {
  const isCategory = contentType === 'meetusCategory'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? meetus.filter(byCategory) : meetus
}

// Export Template for use in CMS preview
export const MeetUsIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  meetus = [],
  meetusCategory = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
        meetus && !!meetus.length
          ? byCategory(byDate(meetus), title, contentType)
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

          {!!meetusCategory.length && (
            <section className="section thin">
              <div className="container">
                <MeetusCategoriesNav enableSearch categories={meetusCategory} />
              </div>
            </section>
          )}

          {!!meetus.length && (
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
const MeetUsIndex = ({ data: { page, meetus, meetusCategory } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <MeetUsIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      meetus={meetus.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      meetusCategory={meetusCategory.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default MeetUsIndex

export const pageQuery = graphql`
  ## Query for MeetUsIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query MeetUsIndex($id: String!) {
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

    meetus: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "meetus" } } }
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
    meetusCategory: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "meetusCategory" } } }
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

import React from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import './SinglePost.css'

// Export Template for use in CMS preview
export const TestimonialsPageTemplate = ({
  title,
  excerpt,
  featuredImage,
  body,
  nextPostURL,
  prevPostURL,
  nextPostTitle,
  prevPostTitle,
}) => (
  <main>
    <PageHeader
      title={title}
      excerpt={excerpt}
      backgroundImage='../../static/images/testimonials.jpg'
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
          <h1>{title}</h1>  <img src="/images/rating.png" alt="rating" width="150px"/>  
        </div>
        <Content source={body} />
        <div  style={{margin: '4rem 0 0 0', display: 'flex'}}>
            {prevPostURL && (
              <Link
                className="SinglePost--Pagination--Link"                
                to={prevPostURL}
              >
                {prevPostTitle}
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SinglePost--Pagination--Link next"
               
                to={nextPostURL}
              >
                {nextPostTitle}
              </Link>
            )}
          </div>
      </div>
 

    </section>
  </main>
)

const TestimonialsPage = ({ data: { page, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === page.id)  
  return (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <TestimonialsPageTemplate 
      {...page} 
      {...page.frontmatter} 
      body={page.html} 
      nextPostURL={_get(thisEdge, 'next.fields.slug')}
      prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      nextPostTitle={_get(thisEdge, 'next.frontmatter.title')}
      prevPostTitle={_get(thisEdge, 'previous.frontmatter.title')}
    
    />
  </Layout>
 )
}


export default TestimonialsPage

export const pageQuery = graphql`
  query TestimonialsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
        html
        id
      frontmatter {
        title
        template
        date(formatString: "MMMM Do, YYYY")
        featuredImage
        excerpt
      }
    }
    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "testimonials" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
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

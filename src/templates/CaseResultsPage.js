import React from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import './SinglePost.css'

// Export Template for use in CMS preview
export const CaseResultsPageTemplate = ({
  title,
  excerpt,
  featuredImage,
  body,
  nextPostURL,
  prevPostURL,
  nextPostTitle,
  prevPostTitle,
  amount,
  result,
  summary,
  casedescription,
  trial,
  caseImage
}) => (
  <main>
    <PageHeader
      title={title}
      excerpt={excerpt}
      backgroundImage={featuredImage}
    />
    
    <section className="section">
      <div className="container">
        <h1>- CASE DESCRIPTION</h1>
      <Content source={casedescription} />
      </div>
    </section>
    <section className="section">
      <div className="container">
      <img src={caseImage.childImageSharp.fluid.src}/>
      </div>
    </section> 
    <section className="section">
      <div className="container">
      <h1>- TRIAL SUMMARY</h1>  
      <Content source={summary} />
      </div>
    </section>
    <section className="section">
      <div className="container">
      <h1>- FINAL RESULT</h1>  
      <Content source={result} />
      </div>
    </section>
    <section className="section">
      <div className="container">
      <h1>- DOLLARS AWARDED</h1>    
      <Content source={amount} />
      <h1>- DAY TRIAL</h1>  
      <Content source={trial} />      
      </div>
    </section>
    <section className="section">
      <div className="container">
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

const CaseResultsPage = ({ data: { page, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === page.id)  
  return (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <CaseResultsPageTemplate 
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

export default CaseResultsPage

export const pageQuery = graphql`
  query CaseResultsPage($id: String!) {
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
        amount
        result
        summary
        casedescription
        trial
        caseImage {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    }
    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "caseResults" } } }
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

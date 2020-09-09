import React from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'

import CountUp from 'react-countup';
import Fade from 'react-reveal/Fade';
import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import './custom.scss'

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

      <Fade top>
      <section className="section">
      <div className="container">
      <h1 style={{textAlign: 'center', fontSize: '44px'}}><Content source={body} /></h1>
      </div>
      </section>
      </Fade>
      
    <Fade left>
    <section className="section">
      <div className="container">
     <div className="CaseResult">
        <h1 style={{textDecoration: 'underline'}}>CASE DESCRIPTION</h1>
        <blockquote>
      <Content source={casedescription} />
      </blockquote>
      </div>
      </div>
    </section>
    </Fade>
    <Fade bottom>
    <section className="section">
      <div className="container">
      <img src={caseImage.childImageSharp.fluid.src} style={{
            borderRadius: '8px 8px 8px 8px',
            overflow: 'hidden',
            boxShadow: '0px 16px 96px -24px rgba(0,0,0,0.3)',
            maxWidth: '380px'
      }} />
      </div>
    </section>
    </Fade> 
    <Fade>
    <section className="section">
      <div className="container">
      <div className="CaseResult">
      <h1>CASE SUMMARY</h1>  
      <Content source={summary} />
      </div>  
      </div>
    </section>
    </Fade>
    <Fade>
    <section className="section">
      <div className="container">
      <div className="CaseResult">
      <h1>FINAL RESULT</h1>  
      <Content source={result} />
      </div>
      </div>
    </section>
    </Fade>
    <section className="section">
      <div className="container">
       <div>
       <p style={{color: '#497070', textAlign:'right', fontFamily:'Prata', fontSize: '42px', fontWeight: '700'}}>DOLLARS AWARDED - <CountUp end={amount} duration={10} style={{color: '#fea70a', fontSize: '62px', fontFamily:'Prata', fontWeight: '700'}}/></p>   
      </div>     
      <div>
      <p style={{color: '#497070', textAlign:'right', fontFamily:'Prata', fontSize: '42px', fontWeight: '700'}}>DAY TRIAL - <CountUp end={trial} duration={10} style={{color: '#fea70a', fontSize: '62px', fontFamily:'Prata', fontWeight: '700'}}/></p>       
      </div>
      </div>
    </section>
    <section className="section">
      <div className="container">
       
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

import React from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import { ChevronLeft } from 'react-feather'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import './SinglePost.css'

// Export Template for use in CMS preview
export const PracticaPageTemplate = ({
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
      backgroundImage={featuredImage}
    />
    <section className="section">
      <div className="container">
      <Link className="SinglePost--BackButton" to="/practice-areas/">
          <ChevronLeft /> BACK
        </Link>
        <br />
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

const PracticaPage = ({ data: { page, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === page.id)  
  return (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
     <HelmetProvider>
         <Helmet titleTemplate="%s | Page">
            <title>{`${page.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${page.frontmatter.excerpt}`}
            />
             <meta name="image" content={`${page.frontmatter.featuredImage.replace(new RegExp("../../static"), '')}`} />
             <meta property="og:image" content={`${page.frontmatter.featuredImage.replace(new RegExp("../../static"), '')}`} />
             <meta property="og:title" content={`${page.frontmatter.title}`} />
             <meta property="og:description" content={`${page.frontmatter.excerpt}`} />
             <meta property="og:url" content={`https://autinlaw.netlify.app` + `${_get(thisEdge, 'node.fields.slug')}`} />
             <meta property="og:site_name" content="https://autinlaw.netlify.app" />
             <meta property="article:author" content="Andrew Traub" />
             <meta name="twitter:title" content={`${page.frontmatter.title}`} />
             <meta name="twitter:url" content={`https://autinlaw.netlify.app` + `${_get(thisEdge, 'node.fields.slug')}`} />
             <meta name="twitter:description" content={`${page.frontmatter.excerpt}`} />
             <meta name="twitter:card" content="summary_large_image" />
	        	 <meta name="twitter:image" content={`${page.frontmatter.featuredImage.replace(new RegExp("../../static"), '')}`} />
             <meta property="og:type" content="page" />          
             <meta property="og:image:alt" content={`${page.frontmatter.title}`} />          
             <meta property="og:locale" content="en_US" />     
          </Helmet>
      </HelmetProvider>  
    <PracticaPageTemplate 
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

export default PracticaPage

export const pageQuery = graphql`
  query PracticaPage($id: String!) {
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
      filter: { fields: { contentType: { eq: "areasdePractica" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
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

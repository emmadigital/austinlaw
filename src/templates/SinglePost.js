import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import author from '../../static/images/author.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTags,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import Slide from 'react-reveal/Slide';
import Content from '../components/Content'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import { ChevronLeft } from 'react-feather'
import { DiscussionEmbed } from 'disqus-react'
import { Helmet } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import './SinglePost.css'


export const SinglePostTemplate = ({
  title,
  date,
  body,
  slug,
  nextPostURL,
  prevPostURL,
  nextPostTitle,
  prevPostTitle,
  featuredImage,
  categories = []
}) =>  {

  const siteUrl = 'https://austinlaw.netlify.app' + slug
    const disqusprops = {
      shortname: `austinlaw-netlify-app`,
      config: { 
        url: siteUrl,
        identifier: title,
        title: title,    
      },
    };
    console.log(siteUrl)

return(
  <main>
    <PageHeader
       title={title}
       backgroundImage={featuredImage}
    />
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
      <Link className="SinglePost--BackButton" to="/blog/">
          <ChevronLeft /> BACK
        </Link>
        <br />
        <div className="SinglePost--Content relative">
        <div className="media-center">
        <Slide bottom><img src={author} className="author-image" alt="Andrew Traub" /> </Slide>
        </div>
        <div className="media-content"><strong style={{color:'maroon'}}><FontAwesomeIcon icon={faUserCircle} size="1x" /></strong><Link className="catLink" to="/meet-us/andrew-traub"> Andrew Traub</Link></div>
          <div className="SinglePost--Meta">
         
          {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {date}
              </time>
            )}
            {categories && (
              <Fragment>
                <span>|</span><FontAwesomeIcon icon={faTags} size="1x" />
                {categories.map((cat, index) => (
                  <Link 
                  className="catLink"
                  to={`/category/${cat.category.replace(/\s+/g, '-').toLowerCase()}`}>
                  <span
                    key={cat.category}
                    className="SinglePost--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                  </Link>
                ))}
              </Fragment>
            )}
          </div>

          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}

          <div className="SinglePost--InnerContent">
            <Content source={body} />
          </div>

          <div className="SinglePost--Pagination">
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
        <br />
        <DiscussionEmbed
    shortname={disqusprops.shortname}
    config={disqusprops.config}
    />
      </div>

    </article>
  </main>
)
            }

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
       <HelmetProvider>
         <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.excerpt}`}
            />
             <meta name="image" content={`${post.frontmatter.featuredImage.replace(new RegExp("../../static"), '')}`} />
             <meta property="og:image" content={`${post.frontmatter.featuredImage.replace(new RegExp("../../static"), '')}`} />
             <meta property="og:title" content={`${post.frontmatter.title}`} />
             <meta property="og:description" content={`${post.frontmatter.excerpt}`} />
             <meta property="og:url" content={`https://autinlaw.netlify.app` + `${_get(thisEdge, 'node.fields.slug')}`} />
             <meta property="og:site_name" content="https://autinlaw.netlify.app" />
             <meta property="article:author" content="Andrew Traub" />
             <meta name="twitter:title" content={`${post.frontmatter.title}`} />
             <meta name="twitter:url" content={`https://autinlaw.netlify.app` + `${_get(thisEdge, 'node.fields.slug')}`} />
             <meta name="twitter:description" content={`${post.frontmatter.excerpt}`} />
             <meta name="twitter:card" content="summary_large_image" />
	        	 <meta name="twitter:image" content={`${post.frontmatter.featuredImage.replace(new RegExp("../../static"), '')}`} />
             <meta property="og:type" content="blog" />          
             <meta property="og:image:alt" content={`${post.frontmatter.title}`} />          
             <meta property="og:locale" content="en_US" />     
          </Helmet>
          </HelmetProvider>
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
        nextPostTitle={_get(thisEdge, 'next.frontmatter.title')}
        prevPostTitle={_get(thisEdge, 'previous.frontmatter.title')}
        slug={_get(thisEdge, 'node.fields.slug')}
        featuredImage={post.frontmatter.featuredImage}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      fields {
        slug
      }
      frontmatter {
        title
        template
        excerpt
        subtitle
        date(formatString: "MMMM Do, YYYY")
        featuredImage
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "blog" } } }
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

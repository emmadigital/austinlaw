import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class Sitemap extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.blog
    const { edges: faq } = data.faq
    const { edges: testimonials } = data.testimonials
    const { edges: caseResults } = data.caseResults
    const { edges: pages } = data.pages
    const { edges: practiceAreas } = data.practiceAreas
    const { edges: areasdePractica } = data.areasdePractica
    const { edges: resources } = data.resources
    const { edges: meetus } = data.meetus


    return (
      <div>

    <h2>Pages</h2>    
      {pages &&
          pages.map(({ node: page }) => (
            <div key={page.id}>
                <div>
                <ul>
                <li>
                    <Link
                      to={page.fields.slug}
                    >
                      {page.frontmatter.title}
                    </Link>
                </li>  
              
                </ul>  
                </div> 
            </div>
          ))}       

    <h2>Practice Areas</h2>    
      {practiceAreas &&
          practiceAreas.map(({ node: practiceArea }) => (
            <div key={practiceArea.id}>
                <div>
                <ul>
                <li>
                    <Link
                      to={practiceArea.fields.slug}
                    >
                      {practiceArea.frontmatter.title}
                    </Link>
                </li>  
              
                </ul>  
                </div> 
            </div>
          ))}       

    <h2>Areas De Practica</h2>    
      {areasdePractica &&
          areasdePractica.map(({ node: Practica }) => (
            <div key={Practica.id}>
                <div>
                <ul>
                <li>
                    <Link
                      to={Practica.fields.slug}
                    >
                      {Practica.frontmatter.title}
                    </Link>
                </li>  
              
                </ul>  
                </div> 
            </div>
          ))}       

     <h2>Blog</h2>    
      {posts &&
          posts.map(({ node: post }) => (
            <div key={post.id}>
                <div>
                <ul>
                <li>
                    <Link
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                </li>  
              
                </ul>  
                </div> 
            </div>
          ))}    
         
         <h2>Case Results</h2>
          {caseResults &&
          caseResults.map(({ node: caseResult }) => (
            <div key={caseResult.id}>
                <div>
                <ul>
                <li>
                    <Link
                      to={caseResult.fields.slug}
                    >
                      {caseResult.frontmatter.title}
                    </Link>
                </li>  
              
                </ul>  
                </div> 
            </div>
          ))}   
         
          <h2>Frequently Asked Questions</h2>
          {faq &&
          faq.map(({ node: faqs }) => (
            <div key={faqs.id}>
                <div>
                <ul>
                <li>
                    <Link
                      to={faqs.fields.slug}
                    >
                      {faqs.frontmatter.title}
                    </Link>
                </li>  
              
                </ul>  
                </div> 
            </div>
          ))}   

    <h2>Meet Us</h2>    
      {meetus &&
          meetus.map(({ node: meet }) => (
            <div key={meet.id}>
                <div>
                <ul>
                <li>
                    <Link
                      to={meet.fields.slug}
                    >
                      {meet.frontmatter.title}
                    </Link>
                </li>  
              
                </ul>  
                </div> 
            </div>
          ))}       

           <h2>Resources</h2>
          {resources &&
          resources.map(({ node: resource }) => (
            <div key={resource.id}>
                <div>
                <ul>
                <li>
                    <Link
                      to={resource.fields.slug}
                    >
                      {resource.frontmatter.title}
                    </Link>
                </li>  
              
                </ul>  
                </div> 
            </div>
          ))}   
    
    
    
           <h2>Testimonials</h2>
          {testimonials &&
          testimonials.map(({ node: testimonial }) => (
            <div key={testimonial.id}>
                <div>
                <ul>
                <li>
                    <Link
                      to={testimonial.fields.slug}
                    >
                      {testimonial.frontmatter.title}
                    </Link>
                </li>  
              
                </ul>  
                </div> 
            </div>
          ))}   
      </div>
 
      
    )
  }
}

Sitemap.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query SitemapQuery {
        blog: allMarkdownRemark(
          filter: { fields: { contentType: { eq: "blog" } } }
          sort: { order: ASC, fields: [frontmatter___title] }
         ) {
          edges {
            node {
              id
              excerpt
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        faq: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "faq" } } }
            sort: { order: ASC, fields: [frontmatter___title] }
           ) {
            edges {
              node {
                id
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  title
                  date(formatString: "DD MMMM YYYY")
                }
              }
            }
          }
          testimonials: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "testimonials" } } }
            sort: { order: ASC, fields: [frontmatter___title] }
           ) {
            edges {
              node {
                id
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
          caseResults: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "caseResults" } } }
            sort: { order: ASC, fields: [frontmatter___title] }
           ) {
            edges {
              node {
                id
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }

          pages: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "pages" } } }
            sort: { order: ASC, fields: [frontmatter___title] }
           ) {
            edges {
              node {
                id
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }

          practiceAreas: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "practiceAreas" } } }
            sort: { order: ASC, fields: [frontmatter___title] }
           ) {
            edges {
              node {
                id
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }

          areasdePractica: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "areasdePractica" } } }
            sort: { order: ASC, fields: [frontmatter___title] }
           ) {
            edges {
              node {
                id
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
          resources: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "resources" } } }
            sort: { order: ASC, fields: [frontmatter___title] }
           ) {
            edges {
              node {
                id
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
          meetus: allMarkdownRemark(
            filter: { fields: { contentType: { eq: "meet-us" } } }
            sort: { order: ASC, fields: [frontmatter___title] }
           ) {
            edges {
              node {
                id
                excerpt
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
    `}
    render={(data, count) => <Sitemap data={data} count={count} />}
  />
)

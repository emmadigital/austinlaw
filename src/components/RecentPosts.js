import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fade from 'react-reveal/Fade';

class RecentPosts extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return (
        <div>
        
        <Fade top> 
        <div className="ctaheading2"><h1> Recent News Updates and Articles </h1></div>
        </Fade>    
        <br />
        <Fade top>
        <Slider {...settings}>
        {posts &&
          posts.map(({ node: post }) => (
            <div key={post.id}>
   
                <div className="RecentPosts">
                <img src={post.frontmatter.featuredImage.replace(new RegExp("../../static"), '') } alt={post.frontmatter.title} />
                    <h4>
                    {post.frontmatter.title}
                    </h4>
                    <p>{post.excerpt}</p>                    
                    <Link
                      to={post.fields.slug}                      
                    >
                      Read More
                    </Link>
                </div> 
            </div>
          ))}
        </Slider>
        </Fade>
      </div>
    )
  }
}

RecentPosts.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query RecentPostsQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { fields: { contentType: { eq: "blog" } } }
          limit: 6
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
                featuredImage
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <RecentPosts data={data} count={count} />}
  />
)

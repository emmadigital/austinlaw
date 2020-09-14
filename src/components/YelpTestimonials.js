import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fade from 'react-reveal/Fade';
import Ratings from './Ratings';


class YelpTestimonials extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allYelpBusinessReview
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
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
        <div className="ctaheading2"><h1>Client Reviews and Ratings</h1> </div>
        </Fade>    
        <br />
        <Fade left>
        <Slider {...settings}>
        {posts &&
          posts.map(({ node: post }) => (
            <div key={post.id}>
   
             <div class="yelptestimonial">
                <img className="yelp" src={post.user.image_url} alt={post.user.name} />                 
               
                <blockquote>
                {post.text}   
                <a style={{display: 'inline-flex'}}
                href={post.url}  
                target="_blank"
                rel="noopener noreferrer"                    
                >
                <strong>Read On</strong>    
                <img  style={{paddingLeft: '5px', marginTop: '-8px'}} src='/images/yelpLogo.png' alt="Yelp Reviews" /> 
                </a>
                </blockquote>
                <div></div>
                <p>
                {post.user.name}   <Ratings n={post.rating} />
                </p>
                </div>


            </div>
          ))}
        </Slider>
        </Fade>
      </div>
    )
  }
}

YelpTestimonials.propTypes = {
  data: PropTypes.shape({
    allYelpBusinessReview: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query YelpTestimonialsQuery {
        allYelpBusinessReview {
            edges {
              node {
                id
                text
                rating
                time_created
                url
                user {
                  name
                  image_url
                  profile_url
                }
              }
            }
          }
      }
    `}
    render={(data, count) => <YelpTestimonials data={data} count={count} />}
  />
)

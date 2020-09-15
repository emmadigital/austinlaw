import React from 'react'
import { graphql } from 'gatsby'

import Content from '../components/Content'
import Layout from '../components/Layout'
import RecentPosts from '../components/RecentPosts'
import Accordion from '../components/Accordion'
import 'react-animated-slider/build/horizontal.css';
import Features from '../components/Features'
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HeroSlider from '../components/HeroSlider'
import CoverSection from '../components/CoverSection'

import '../components/Gallery.css'
import './custom.scss';

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, subtitle, featuredImage, body, intro, cover, wwcheading, wwcsubheading, heroslider, accordion, ctaheading, experiencesection, experiencevideo }) => (
  <main className="Home">
  <Fade bottom>
    <div className="ctaheading">
    <h1>{ctaheading}</h1><br />
    </div>
    </Fade>
    <section className="section">
      <div className="container">
      <Features gridItems={intro.blurbs} />
      </div>
    </section>
     <HeroSlider heroItems={heroslider.slider} /> 
    <Fade bottom cascade>
  <section>
 <div class="group">
    <div class="left2">
    <AliceCarousel autoPlay autoPlayInterval="3000">
  {experiencesection.slider.map((item, index) => (
					<div>
						<h1>{item.sliderheading}</h1>
						<p>{item.slidertext}</p>
					</div>
			))}
    </AliceCarousel>    </div>
    <div class="right2">
    <Content source={experiencevideo} />    </div>
</div>
 </section>
 </Fade>
 <br />
 <br />
 <br />
    <section className="section">
    <div class="container">
    <div className="taCenter">
    <Flip bottom>  
    <h1 className="ctaheading2">{wwcheading}</h1>
    <p>{wwcsubheading}</p>
    </Flip>
    </div>
    <Fade>
    <CoverSection coverItems={cover.coversection} />  
    
      </Fade>
     </div>      
     </section>
     <Fade bottom>
    <section className="section">
      <div className="container">
        <div className="section_3">
        <Content source={body} />
        </div>
        </div>
    </section>
    </Fade>
    <Fade top>
    <div className="ctaheading2">
    <h1>Frequently Asked Questions</h1><br />
    </div>
    </Fade>
    <section className="section">
      <div className="container">
        <Accordion items={accordion} />
      </div>
    </section>
    <section className="section">
      <div className="container">
       <RecentPosts />
      </div>
    </section>
   </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        ctaheading
        wwcheading
        wwcsubheading
        accordion {
          title
          contentheading
          content
        }
        experiencesection {
          slider {
            sliderheading
            slidertext
          }
        }
        experiencevideo
        heroslider {
          slider {
            slidertext
            sliderheading
            sliderbuttontext
            sliderbuttonlink
            image {
              childImageSharp {
                fluid(maxWidth: 1600, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 200, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
            blurbsheading
            }
        }
        cover {
          coversection {
            sectionheading
            sectionlink
            sectionlinktext
            sectiontext
            image {
              childImageSharp {
                fluid(maxWidth: 450, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import Accordion from '../components/Accordion'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Features from '../components/Features'
import Flip from 'react-reveal/Flip';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import '../components/Gallery.css'
import './custom.scss';

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, subtitle, featuredImage, body, intro, heroslider, accordion, ctaheading }) => (
  <main className="Home">
    <Slider className="slider-wrapper" autoplay={3000}>
			{heroslider.slider.map((item, index) => (
				<div
					key={index}
					className="slider-content"
					style={{ background: `url('${item.image.childImageSharp.fluid.src}') no-repeat center center / cover` }}
				>
					<div className="inner">
						<h1>{item.sliderheading}</h1>
						<p>{item.slidertext}</p>
						<a href={item.sliderbuttonlink}><button>{item.sliderbuttontext}</button></a>
					</div>
				</div>
			))}
		</Slider>
    <Flip top>
    <div style={{maxWidth: '481px', marginLeft: '35%'}}>
    <h1 style={{ textAlign: 'center', fontSize:'42px', marginTop: '25px', borderBottom: '#fea70a solid 4px' }}>{ctaheading}</h1><br />
    </div>
    </Flip>
    <section className="section">
      <div className="container">
      <Features gridItems={intro.blurbs} />
      </div>
    </section>

    <section className="section">
      <div className="container">   
  <div class="rowExp">
  <div class="columnExp left">
  <AliceCarousel autoPlay autoPlayInterval="3000">
      <div style={{textAlign: 'center', verticalAlign: 'middle', fontSize: '14px', margin: '2%'}}>
        <h1>Slide</h1>
        <p>First Slide</p>
      </div>
      <div style={{textAlign: 'center', verticalAlign: 'middle', fontSize: '14px', margin: '2%'}}>
        <h1>Slide</h1>
        <p>First Slide</p>
      </div>
      <div style={{textAlign: 'center', verticalAlign: 'middle', fontSize: '14px', margin: '2%'}}>
        <h1>Slide</h1>
        <p>First Slide</p>
      </div>
      <div style={{textAlign: 'center', verticalAlign: 'middle', fontSize: '14px', margin: '2%'}}>
        <h1>Slide</h1>
        <p>First Slide</p>
      </div>
    </AliceCarousel>
  </div>
  <div class="columnExp right">
    <h2>Column 2</h2>
    <p>Some text..</p>
  </div>
</div>
</div>
    </section>
 
    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
    <Flip top>
    <div style={{maxWidth: '581px', marginLeft: '32%'}}>
    <h1 style={{ textAlign: 'center', fontSize:'42px', marginTop: '25px', borderBottom: '#fea70a solid 4px' }}>Frequently Asked Questions</h1><br />
    </div>
    </Flip>
    <section className="section">
      <div className="container">
        <Accordion items={accordion} />
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
        accordion {
          title
          description
          content
        }
        heroslider {
          slider {
            slidertext
            sliderheading
            sliderbuttontext
            sliderbuttonlink
            image {
              childImageSharp {
                fluid {
                  src
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
      }
    }
  }
`

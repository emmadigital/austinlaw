import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import './Gallery.css'
import Img from 'gatsby-image'

const ReactMarkdown = require('react-markdown/with-html')

const FeatureGrid = ({ gridItems }) => (
  <div className="Gallery">
    {gridItems.map((item) => (
      <div key={item.text} className="Gallery--Item">
        <section>
          <div>
          <h1 className="has-text-centered" style={{
                fontSize: '28px',
                textAlign: 'center',
                color: '#497070',
                height: '80px',
                }}><strong>{item.blurbsheading}</strong></h1>
            <figure >
           
            <div style={{height: '200px'}}>
                    <img src={item.image.childImageSharp.fluid.src}/>
                  </div> 
           </figure>
          </div>

         
          <p><ReactMarkdown
            source={item.text}
            escapeHtml={false}
          /></p>
        </section>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
      blurbsheading: PropTypes.string,
    })
  ),
}

export default FeatureGrid

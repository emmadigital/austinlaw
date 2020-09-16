import React from 'react'
import PropTypes from 'prop-types'
import './Gallery.css'
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';

const ReactMarkdown = require('react-markdown/with-html')

const FeatureGrid = ({ gridItems }) => (
 
  <div className="Gallery">
    {!!gridItems && 
    gridItems.map((item) => (
      <div key={item.text} className="Gallery--Item">
        <section>       
          <div>
           <Fade bottom>
             <h1 className="has-text-centered" style={{
                fontSize: '28px',
                fontWeight: '700',
                textAlign: 'center',
                color: '#497070',
                height: '80px',
                }}>{item.blurbsheading}</h1>
            </Fade>    
            <figure>
            <Flip top>
            <div style={{height: '150px'}}>
            {item.image && 
            item.image.length > 0 && (    
            <img src={item.image.childImageSharp.fluid.src} alt={item.blurbsheading} />
            )}     </div> 
          </Flip>      
           </figure>
          </div>
          <Fade bottom>
          <p className="Gallery--Item-P"><ReactMarkdown
            source={item.text}
            escapeHtml={false}
          /></p>
          </Fade>    
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

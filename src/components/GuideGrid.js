import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import './Guide.css'
import Img from 'gatsby-image'
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import { Link } from 'gatsby'


const ReactMarkdown = require('react-markdown/with-html')

const GuideGrid = ({ gridItems }) => (
 
  <div className="Guide">
    {gridItems.map((item) => (
      <div key={item.text} className="Guide--Item">
        <section>       
          <div>
           <Fade bottom>
             <h1 className="has-text-centered" style={{
                fontSize: '18px',
                fontWeight: '700',
                textAlign: 'center',
                color: '#497070',
                height: '80px',
                }}>{item.blurbsheading}</h1>
            </Fade>    
            <figure>
            <Flip top>
            <div style={{height: '200px'}}>
                    <img src={item.image.childImageSharp.fluid.src}/>
                  </div> 
          </Flip>      
           </figure>
          </div>
          <Fade bottom>
          <p className="Guide--Item-P"><ReactMarkdown
            source={item.text}
            escapeHtml={false}
          /></p>
          </Fade>   
    
          <Fade bottom>
              
              {item.link.includes(".pdf") === true ? (
              <a rel="noopener noreferrer" href={item.link} target="_blank" className="Guide--Item-Link">Click Here</a>
              ) : <Link to={item.link} className="Guide--Item-Link">Click Here</Link>            
              }
          </Fade> 
        </section>
      </div>
    ))}
  </div>
)

GuideGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
      blurbsheading: PropTypes.string,
      link: PropTypes.string,
    })
  ),
}

export default GuideGrid

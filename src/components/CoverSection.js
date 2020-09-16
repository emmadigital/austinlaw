import React from 'react'
import PropTypes from 'prop-types'
import Content from '../components/Content'

const CoverSection = ({ coverItems }) => (
    <div>    
    { !!coverItems &&
    coverItems.map((item, index) => (
    
    <div class="items">
        <div class="items-head">
          <p>{item.sectionheading}</p>
          <hr />
        </div>    
        <div class="items-body">
         <p
         style={{ background: `url('${
          !!item.image.childImageSharp ? item.image.childImageSharp.fluid.src : item.image
          }') no-repeat bottom right` }}
         ><Content source={item.sectiontext} /> </p>
         </div>
      </div>))}  
      </div>
  
)

CoverSection.propTypes = {
  coverItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      sectiontext: PropTypes.string,
      sectionheading: PropTypes.string,
    })
  ),
}

export default CoverSection

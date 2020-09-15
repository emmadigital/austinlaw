import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-animated-slider';

const HeroSlider = ({ heroItems }) => (
    <Slider className="slider-wrapper" autoplay={3000}>
      {heroItems.map((item, index) => (				
        <div
					key={index}
					className="slider-content"
					style={{ background: `url('${
            !!item.image.childImageSharp ? item.image.childImageSharp.fluid.src :  item.image
          }') no-repeat center center / cover` 
        }}
				>
					<div className="inner">
						<h1>{item.sliderheading}</h1>
						<p>{item.slidertext}</p>
						<a href={item.sliderbuttonlink}><button>{item.sliderbuttontext}</button></a>
            <h2 style={{color: 'white', fontSize: '34px'}}>
            <a id="sliderPhone" href={`tel:${"512246-9191"}`}>(512) 246-9191</a>  
            </h2>
					</div>
				</div>
			))}
		</Slider>
  
)

HeroSlider.propTypes = {
  heroItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      slidertext: PropTypes.string,
      sliderheading: PropTypes.string,
      sliderbuttonlink: PropTypes.string,
    })
  ),
}

export default HeroSlider

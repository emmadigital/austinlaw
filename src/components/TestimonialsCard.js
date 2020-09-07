import React from 'react'
import { Link } from 'gatsby'

import './PostCard.css'

const TestimonialsCard = ({
  featuredImage,
  title,
  excerpt,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  
  <Link to={slug} className={`PostCard ${className}`}>
    {featuredImage && (
        <div className="PostCard--Image relative" style={{
          backgroundImage: `url(${
            !!featuredImage ? featuredImage.replace(new RegExp("../../static"), '') : null
          })`,
          borderRadius: '50%',
          width: '150px',
          height: '150px',
          margin: '5px auto 10px',
          transition: '.3s border linear',
        }}>
             
      </div> 
    )}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      
      {categories === null ? (
      <div></div>
    ) : (
      <div className="PostCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
    )
    }
      {excerpt && <div className="PostCard--Excerpt">{excerpt}</div>}
      <img src="/images/rating.png" alt="rating"/>  

    </div>
  </Link>
)

export default TestimonialsCard

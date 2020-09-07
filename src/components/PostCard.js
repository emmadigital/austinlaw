import React from 'react'
import { Link } from 'gatsby'

import './PostCard.css'

const PostCard = ({
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
          backgroundSize: '450px',
        }}>
        <h3  style={{
          boxShadow: '0.5rem 0 0 #fea70a, -0.5rem 0 0 #fea70a',
          backgroundColor: '#a52020a3',
          color: 'white',
          padding: '1.2rem',
          maxWidth: '300px',
          textAlign: 'left',
          display: 'inline-block',
          marginTop: '10%',
          marginLeft: 'auto',
          fontSize: '1.5rem',
          fontWeight: '500'
           }} >{title}</h3>     
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
    </div>
  </Link>
)

export default PostCard

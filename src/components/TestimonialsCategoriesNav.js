import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const TestimonialsCategoriesNav = ({ categories, enableSearch }) => (

  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/testimonials/`}>
      All
    </Link>
    {categories.map((testimonialsCategory, index) => (
        
      <Link
        exact="true"
        className="NavLink"
        key={testimonialsCategory.title + index}
        to={testimonialsCategory.slug}
      >
        {testimonialsCategory.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default TestimonialsCategoriesNav

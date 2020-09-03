import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const PracticeCategoriesNav = ({ categories, enableSearch }) => (

  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/practice-areas/`}>
      All
    </Link>
    {categories.map((practiceCategory, index) => (
        
      <Link
        exact="true"
        className="NavLink"
        key={practiceCategory.title + index}
        to={practiceCategory.slug}
      >
        {practiceCategory.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default PracticeCategoriesNav

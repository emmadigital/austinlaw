import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const MeetusCategoriesNav = ({ categories, enableSearch }) => (

  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/meet-us/`}>
      All
    </Link>
    {categories.map((meetusCategory, index) => (
        
      <Link
        exact="true"
        className="NavLink"
        key={meetusCategory.title + index}
        to={meetusCategory.slug}
      >
        {meetusCategory.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default MeetusCategoriesNav

import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const ResourcesCategoriesNav = ({ categories, enableSearch }) => (

  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/resources/`}>
      All
    </Link>
    {categories.map((resourcesCategory, index) => (
        
      <Link
        exact="true"
        className="NavLink"
        key={resourcesCategory.title + index}
        to={resourcesCategory.slug}
      >
        {resourcesCategory.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default ResourcesCategoriesNav

import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const PracticaCategoriesNav = ({ categories, enableSearch }) => (

  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/areas-de-practica/`}>
      All
    </Link>
    {categories.map((areasdePracticaCategory, index) => (
        
      <Link
        exact="true"
        className="NavLink"
        key={areasdePracticaCategory.title + index}
        to={areasdePracticaCategory.slug}
      >
        {areasdePracticaCategory.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default PracticaCategoriesNav

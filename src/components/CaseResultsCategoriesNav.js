import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const CaseResultsCategoriesNav = ({ categories, enableSearch }) => (

  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/case-results/`}>
      All
    </Link>
    {categories.map((caseresultsCategory, index) => (
        
      <Link
        exact="true"
        className="NavLink"
        key={caseresultsCategory.title + index}
        to={caseresultsCategory.slug}
      >
        {caseresultsCategory.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default CaseResultsCategoriesNav

import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const FaqCategoriesNav = ({ categories, enableSearch }) => (

  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/faq/`}>
      All
    </Link>
    {categories.map((faqCategory, index) => (
        
      <Link
        exact="true"
        className="NavLink"
        key={faqCategory.title + index}
        to={faqCategory.slug}
      >
        {faqCategory.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default FaqCategoriesNav

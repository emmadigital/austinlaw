import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'
const PostCategoriesNav = ({ categories, enableSearch }) => (
  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/blog/`}>
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}
 
    <div style={{paddingTop:'20px'}}>
    <br />
    <br />
    {enableSearch && <BlogSearch />}
    </div>
  </div>
)

export default PostCategoriesNav

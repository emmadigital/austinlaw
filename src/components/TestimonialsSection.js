import React from 'react'

import TestimonialsCard from '../components/TestimonialsCard'
import './PostSection.css'

class TestimonialsSection extends React.Component {
  static defaultProps = {
    blog: [],
    title: '',
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { blog, title, showLoadMore, loadMoreTitle } = this.props,
      { limit } = this.state,
      visiblePosts = blog.slice(0, limit || blog.length)

    return (
      <div className="PostSection">
        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visiblePosts.length && (
          <div className="PostSection--Grid">
            {visiblePosts.map((post, index) => (
              <TestimonialsCard key={post.title + index} {...post} />
            ))}
          </div>
        )}
        {showLoadMore && visiblePosts.length < blog.length && (
          <div className="taCenter">
            <button className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default TestimonialsSection

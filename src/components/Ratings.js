import React from 'react'

const Ratings = ({n}) => {
  let stars = []
  for (let i = 0; i < n; ++i) {
    stars.push(<i className="fa fa-star" key={i}></i>)
  }

  return (
    
    <span style={{display: 'inline-flex'}}> {stars} </span>

  )
}

export default Ratings
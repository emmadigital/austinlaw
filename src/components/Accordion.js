import React from 'react'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import _kebabCase from 'lodash/kebabCase'
import './Accordion.css'
import Flip from 'react-reveal/Flip';


export default class Accordion extends React.Component {
  static defaultProps = {
    items: [],
    className: ''
  }

  // use state to auto close but has issues mobile view. onClick={() => this.handleClick(index)}
  // state = {
  //   activeItem: null
  // }
  //
  // handleClick = index => {
  //   this.setState({
  //     activeItem: this.state.activeItem === index ? null : index
  //   })
  // }

  handleClick = event => event.target.classList.toggle('active')

  render() {
    const { items, className } = this.props
    return (
      <Flip bottom cascade>
        <div className={`Accordion ${className}`}>
        {!!items &&
          items.map((item, index) => (
            <div
              className={`Accordion--item `}
              key={`accordion-item-${_kebabCase(item.title) + '-' + index}`}
              onClick={this.handleClick}
            >
              <h2 className="flex">
                <span>{item.title}</span>
                <ChevronDown />
              </h2>
              <div className={'description'}>
                <h3>{item.contentheading}</h3>
                {item.content} <br />
                {item.link && (
                  <div href={item.link} className="button">
                    {item.linkTitle}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      </Flip>
    )
  }
}

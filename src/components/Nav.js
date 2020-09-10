import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'

import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  render() {
    const { active } = this.state,
      { subNav } = this.props,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className="Nav--Links">
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'meet-us' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('meetus') ||
                  this.props.location.pathname.includes('meetus') ||
                  this.props.location.pathname.includes('categories')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('meet-us')}
              >
                Meet Us
                <div className="Nav--GroupLinks">
                    <NavLink
                      to="/meet-us/andrew-traub/"
                      className="Nav--GroupLink"
                    >
                      Andrew Traub
                    </NavLink>
                    <NavLink
                      to="/meet-us/why-us/"
                      className="Nav--GroupLink"
                    >
                      Why Us
                    </NavLink>
                    <NavLink
                      to="/meet-us/what-is-my-case-worth/"
                      className="Nav--GroupLink"
                    >
                     Tell Us About Your Case
                    </NavLink>
                    <NavLink
                      to="/meet-us/free-consultation/"
                      className="Nav--GroupLink"
                    >
                      Free Consultation
                    </NavLink>
  
                </div>
              </span>
            </div>

            <NavLink to="/case-results/">Results</NavLink>

            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'resources' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('resources') ||
                  this.props.location.pathname.includes('resources') ||
                  this.props.location.pathname.includes('categories')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('resources')}
              >
                Resources
                <div className="Nav--GroupLinks">
                    <NavLink
                      to="/resources/guides/"
                      className="Nav--GroupLink"
                    >
                      Guides
                    </NavLink>
                    <NavLink
                      to="/car-accident-app/"
                      className="Nav--GroupLink"
                    >
                     Car Accident App
                    </NavLink>
                    <NavLink
                      to="/category/videos/"
                      className="Nav--GroupLink"
                    >
                      Videos
                    </NavLink>
                    <NavLink
                      to="/faq/"
                      className="Nav--GroupLink"
                    >
                     FAQs
                    </NavLink>
                </div>
              </span>
            </div>
            <div
              className={`Nav--Group ${
                this.state.activeSubNav === 'practiceareas' ? 'active' : ''
              }`}
            >
              <span
                className={`NavLink Nav--GroupParent ${
                  this.props.location.pathname.includes('practiceareas') ||
                  this.props.location.pathname.includes('practiceareas') ||
                  this.props.location.pathname.includes('categories')
                    ? 'active'
                    : ''
                }`}
                onClick={() => this.toggleSubNav('practiceareas')}
              >
                Negligence
                <div className="Nav--GroupLinks">
                    <NavLink
                      to="/practice-areas/car-accident-lawyers/"
                      className="Nav--GroupLink"
                    >
                      Car Accidents
                    </NavLink>
                    <NavLink
                      to="/practice-areas/truck-accident-lawyer/"
                      className="Nav--GroupLink"
                    >
                     Truck Accidents
                    </NavLink>
                    <NavLink
                      to="/practice-areas/motorcycle-accident-attorney/"
                      className="Nav--GroupLink"
                    >
                    Motorcycle Accidents
                    </NavLink>
                    <NavLink
                      to="/practice-areas/drunk-driving-accident-lawyer/"
                      className="Nav--GroupLink"
                    >
                   Drunk Driving Accidents
                    </NavLink>
                    <NavLink
                      to="/practice-areas/distracted-driver/"
                      className="Nav--GroupLink"
                    >
                   Distracted Driving Accidents
                    </NavLink>
                    <NavLink
                      to="/practice-areas/running-red-light-accident/"
                      className="Nav--GroupLink"
                    >
                   Red Light Accidents
                    </NavLink>
                    <NavLink
                      to="/practice-areas/pedestrian-accident-lawyers/"
                      className="Nav--GroupLink"
                    >
                   Pedestrian Accidents
                    </NavLink>
                    <NavLink
                      to="/practice-areas/slip-and-fall-injury-lawyers/"
                      className="Nav--GroupLink"
                    >
                   Slip and Fall Accidents
                    </NavLink> 
                    <NavLink
                      to="/practice-areas/dog-bite-injury-lawyer/"
                      className="Nav--GroupLink"
                    >
                   Dog Bites
                    </NavLink>
                    <NavLink
                      to="/practice-areas/product-defect-lawyer/"
                      className="Nav--GroupLink"
                    >
                   Product Defects
                    </NavLink>    
                    <NavLink
                      to="/practice-areas/uninsured-and-underinsured-claims/"
                      className="Nav--GroupLink"
                    >
                   Underinsured Claims
                    </NavLink>  
                </div>
              </span>
            </div>

            <NavLink to="/practice-areas/">Injuries</NavLink>
            <NavLink to="/blog/">Blog</NavLink>         
            <NavLink to="/testimonials/">Testimonials</NavLink>
            <NavLink to="/helmet-donations/">Giving Back</NavLink>
            <NavLink to="/contact-us/">Contact</NavLink>
          </div>
         
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)

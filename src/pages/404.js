import React from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import _get from 'lodash/get'
import AlertTriangle from 'react-feather/dist/icons/alert-triangle'

import Layout from '../components/Layout'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import '../templates/custom.scss';


const content = [
	{
		title: 'Vulputate Mollis Ultricies Fermentum Parturient',
		description:
		'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
    button: 'Read More',
    link: '/',
		image: 'https://i.imgur.com/ZXBtVw7.jpg',
	},
	{
		title: 'Tortor Dapibus Commodo Aenean Quam',
		description:
		'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
		button: 'Discover',
    link: '/contact/',
    image: 'https://i.imgur.com/DCdBXcq.jpg',
	},
	{
		title: 'Phasellus volutpat metus',
		description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
		button: 'Buy now',
    link: '/contact/',
    image: 'https://i.imgur.com/DvmN8Hx.jpg',
	}
];
export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query NotFoundPageQuery {
        globalSettings: settingsYaml {
          siteTitle
        }
      }
    `}
    render={data => (
      <Layout>
        <Helmet>
          <title>404 – Page Not Found</title>
        </Helmet>


        <Slider className="slider-wrapper" autoplay={3000}>
			{content.map((item, index) => (
				<div
					key={index}
					className="slider-content"
					style={{ background: `url('${item.image}') no-repeat center center` }}
				>
					<div className="inner">
						<h1>{item.title}</h1>
						<p>{item.description}</p>
						<a href={item.link}><button>{item.button}</button></a>
					</div>
				</div>
			))}
		</Slider>
        <section className="section thick">
          <div className="container skinny taCenter">
            <p>
              <AlertTriangle size="5rem" />
            </p>
            <h1>404 - Page Not Found</h1>
            <p>
              We can't find the page you are looking for!
              <br />
              Head back to{' '}
              <Link to="/">{_get(data, 'globalSettings.siteTitle')}</Link>
            </p>
          </div>
        </section>
      </Layout>
    )}
  />
)

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, withPrefix } from 'gatsby'
import Navbar from './navbar'
import 'bootstrap/dist/css/bootstrap.css'
import './static/css/flexslider.css'
import './static/css/style.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content:
                'We index podcast episodes, so you can browse for programming podcasts by tag.'
            },
            { name: 'keywords', content: 'programming, podcasts' }
          ]}
        >
          {/* <link rel='stylesheet' href={withPrefix('./css/bootstrap.css')} />
          <link rel='stylesheet' href={withPrefix('./css/flexslider.css')} />
          <link rel='stylesheet' href={withPrefix('./css/style.css')} /> */}

          <script src={withPrefix('./js/_bundle.js')} />
        </Helmet>
        <Navbar />
        {children}
        <section id='footer' className='section footer'>
          <div className='align-center copyright'>
            <p>Copyright &copy; All rights reserved</p>
            <p>
              Photo by{' '}
              <a href='https://unsplash.com/photos/cZWZjymwI9o?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText'>
                Stink Pickle
              </a>{' '}
              on <a href='https://unsplash.com'>Unsplash</a>
            </p>
          </div>
        </section>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

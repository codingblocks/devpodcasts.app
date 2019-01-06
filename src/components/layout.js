import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Navbar from './navbar'
import Sponsors from '../components/sponsors'
import Footer from './footer'
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
        />
        <Navbar />
        {children}
        <Sponsors />
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

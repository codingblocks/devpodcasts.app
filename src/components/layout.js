import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, withPrefix } from 'gatsby'
import Navbar from './navbar'
import Sponsors from '../components/sponsors'
import Footer from './footer'
import 'bootstrap/dist/css/bootstrap.css'
// import './static/css/style.css' UGH, WHY IS THIS NOT GETTING INCLUDED AFTER BOOTSTRAP IN PROD!?!!?

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
          <link
            href={withPrefix('./css/style.css')}
            rel='stylesheet'
            type='text/css'
          />
        </Helmet>
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

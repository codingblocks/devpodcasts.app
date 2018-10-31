import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div className='header'>
    <div>
      <h1>
        <Link
          to='/'
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header

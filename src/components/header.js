import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div className='header'>
    <Link
      to='/'
      style={{
        color: 'white',
        textDecoration: 'none'
      }}
      className='title'
    >
      {siteTitle}
    </Link>
  </div>
)

export default Header

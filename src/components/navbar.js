import React from 'react'
import { Link } from 'gatsby'

const Navbar = () => (
  <div
    className='navbar navbar-fixed-top'
    role='navigation'
    data-0='background-color:rgba(0,0,0,0);'
    data-300='background-color:rgba(0, 0, 0, 1);'
  >
    <div className='navbar-header'>
      <button
        type='button'
        className='navbar-toggle'
        data-toggle='collapse'
        data-target='.navbar-collapse'
      >
        <span className='fa fa-bars color-white' />
      </button>
    </div>
    <div className='navbar-collapse collapse'>
      <ul
        className='nav navbar-nav'
        data-0='margin-top:20px;'
        data-300='margin-top:5px;'
      >
        <li className='active'>
          <a href='index.html'>Home</a>
        </li>
        <li>
          <a href='/tags'>tags</a>
        </li>
        <li>
          <a href='/search'>search</a>
        </li>
        <li>
          <a href='/latest'>latest</a>
        </li>
      </ul>
    </div>
  </div>
)

export default Navbar

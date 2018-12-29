import React from 'react'
import { Link } from 'gatsby'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap'

export default class ReactNavbar extends React.Component {
  constructor (props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render () {
    return (
      <div>
        <Navbar dark fixed='top' onClick={this.toggleNavbar}>
          <NavbarBrand to='/'>
            <p className='home-title'>Dev Podcasts</p>
          </NavbarBrand>
          <NavbarToggler />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <div className='input-group nav-search'>
                  <input
                    className='form-control py-2'
                    placeholder='search for something'
                    type='search'
                    id='example-search-input'
                  />
                  <span className='input-group-append'>
                    <button className='btn btn-outline-secondary' type='button'>
                      <i className='fa fa-search' />
                    </button>
                  </span>
                </div>
              </NavItem>
              <NavItem>
                <NavLink href='/tags'>
                  <Button block>Tags</Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/latest'>
                  <Button block>Latest</Button>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href='https://github.com/codingblocks/podcast-app'
                  target='_blank'
                >
                  <Button block>Github Repository</Button>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

import React from 'react'
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

  search () {
    const searchTerm = this.refs.searchInput.value
    if (searchTerm.length) {
      // location.href to qit, for now
      window.location.href = `https://qit.cloud/search/"${encodeURI(
        searchTerm
      )}"`
    }
  }

  render () {
    return (
      <div>
        <Navbar dark fixed='top'>
          <NavbarBrand to='/' href='/'>
            <p className='home-title'>Dev Podcasts</p>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <div className='input-group nav-search'>
                  <input
                    className='form-control py-2'
                    placeholder='search for something'
                    type='search'
                    ref='searchInput'
                  />
                  <span className='input-group-append'>
                    <button
                      className='btn btn-outline-secondary'
                      type='button'
                      onClick={this.search.bind(this)}
                    >
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
                <NavLink href='/shows'>
                  <Button block>Shows</Button>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

import React from 'react';
import NavLink from './NavLink'

class Header extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/">Navbar</a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavLink to="/" label="Home"/>
            <NavLink to="/login" label="Login"/>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header

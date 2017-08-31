import React from 'react';
import NavLink from './NavLink'
import {connect} from 'react-redux'
import NavBar from './NavBar'
import {logout} from '../epics/logout'

class Header extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    if(this.props.myUser){
      return (
        <NavBar>
          <NavLink to="/" label="Home"/>
          <NavLink to="/entries" label="Entries"/>

          <li className={"nav-item"}>
            <a onClick={this.props.logout} className="nav-link">
              Logout {this.props.myUser.email}
            </a>
          </li>
        </NavBar>
      )
    }else{
      return (
        <NavBar>
          <NavLink to="/" label="Home"/>
          <NavLink to="/login" label="Login"/>
        </NavBar>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    myUser: state.myUser
  }
}
Header = connect(mapStateToProps, {
  logout
})(Header)
export default Header

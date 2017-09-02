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
    if(!this.props.myUser){
      return (
        <NavBar>
          <NavLink to="/" label="Home"/>
          <NavLink to="/register" label="Register"/>
        </NavBar>
      )
    }else if(this.props.myUser.role == 'user'){
      return (
        <NavBar>
          <NavLink to="/" label="Home"/>
          <NavLink to="/report" label="Report"/>

          <li className={"nav-item"}>
            <a onClick={this.props.logout} className="nav-link">
              Logout {this.props.myUser.email}
            </a>
          </li>
        </NavBar>
      )
    }else if(this.props.myUser.role == 'admin' || this.props.myUser.role == 'manager'){
      return (
        <NavBar>
          <NavLink to="/" label="Home"/>
          <li className={"nav-item"}>
            <a onClick={this.props.logout} className="nav-link">
              Logout {this.props.myUser.email}
            </a>
          </li>
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

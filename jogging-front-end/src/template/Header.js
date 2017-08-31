import React from 'react';
import NavLink from './NavLink'
import {connect} from 'react-redux'
import NavBar from './NavBar'

class Header extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    if(this.props.myUser){
      return (
        <NavBar>
          <NavLink to="/" label="Home"/>
          <NavLink to="/logout" label={"Logout" + " " + this.props.myUser.email}/>
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
Header = connect(mapStateToProps)(Header)
export default Header

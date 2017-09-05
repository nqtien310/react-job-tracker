import React from 'react';
import NavLink from './NavLink'
import {connect} from 'react-redux'
import NavBar from './NavBar'
import {logout} from '../epics/logout'
import {Link, withRouter} from 'react-router-dom'

class Header extends React.Component{
  constructor(props){
    super(props)
  }

  displayBackButton(){
    if(this.isHidingBackBtn()){
      return null
    }else {
      return (
        <a className="back-btn btn btn-info" onClick={this.props.history.goBack}>
          <i className="fa fa-arrow-left"/>
        </a>
      )
    }
  }

  isHidingBackBtn(){
    const pagesWithoutBackBtn = ['/','/register']
    return pagesWithoutBackBtn.find((page) => page === this.props.match.path)
  }


  render(){
    if(!this.props.myUser){
      return (
        <NavBar>
          <NavLink to="/" label="Home"/>
          <NavLink to="/register" label="Register"/>
        </NavBar>
      )
    }else {
      return (
        <NavBar>
          <NavLink to="/" label="Home"/>

          <li className={"nav-item"}>
            <a onClick={this.props.logout} className="nav-link">
              Logout {this.props.myUser.email} ({this.props.myUser.role})
            </a>
          </li>
          <li className="nav-item">
            {this.displayBackButton()}
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

export default withRouter(Header)

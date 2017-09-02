import React from 'react';
import Template from '../Template'
import { connect } from 'react-redux'
import NonLoginHome from './NonLoginHome'
import RegularUserHome from '../RegularUser/Home'
import AdminUserHome from '../AdminUser/Home'
import ManagerUserHome from '../ManagerUser/Home'

function Home(props) {
  if(!props.myUser) {
    return <NonLoginHome/>
  }else if(props.myUser.role === 'user') {
    return (
      <Template>
        <RegularUserHome myUser={props.myUser}/>
      </Template>
    )
  }else if(props.myUser.role === 'admin') {
    return (
      <Template>
        <AdminUserHome myUser={props.myUser}/>
      </Template>
    )
  }else if(props.myUser.role === 'manager') {
    return (
      <Template>
        <ManagerUserHome myUser={props.myUser}/>
      </Template>
    )
  }
}

function mapStateToProps(state){
  return {
    myUser: state.myUser
  }
}

export default connect(mapStateToProps)(Home)

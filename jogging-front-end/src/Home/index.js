import React from 'react';
import Template from '../Template'
import { connect } from 'react-redux'
import NonLoginHome from './NonLoginHome'
import RegularUserHome from '../RegularUser/Home'
import AdminUserHome from '../AdminUser/Home'

function Home(props) {
  function renderHomeAccordingly(){
    if(!props.myUser) {
      return <NonLoginHome/>
    }else if(props.myUser.role === 'user') {
      return <RegularUserHome myUser={props.myUser}/>
    }else if(props.myUser.role === 'admin') {
      return <AdminUserHome myUser={props.myUser}/>
    }
  }

  return (
    <Template> {renderHomeAccordingly()} </Template>
  )
}

function mapStateToProps(state){
  return {
    myUser: state.myUser
  }
}

export default connect(mapStateToProps)(Home)

import React from 'react';
import Template from '../Template'
import { connect } from 'react-redux'
import NonLoginHome from './NonLoginHome'
import RegularUserHome from '../RegularUser/Home'

class Home extends React.Component{
  constructor(props){
    super(props)
  }

  renderHomeAccordingly(){
    if(!this.props.myUser) {
      return <NonLoginHome/>
    }else if(this.props.myUser.role == 'user') {
      return <RegularUserHome/>
    }
  }

  render(){
    return (
      <Template>
        {this.renderHomeAccordingly()}
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

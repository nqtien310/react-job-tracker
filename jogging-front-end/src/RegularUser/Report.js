import React from 'react';
import Template from '../Template'
import { connect } from 'react-redux'
import ReportList from '../ReportList'

class Report extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    if(this.props.myUser) {
      return (
        <ReportList userId={this.props.myUser.id} />
      )
    }else {
      return null
    }
  }
}

function mapStateToProps(state){
  return {
    myUser: state.myUser
  }
}

export default connect(mapStateToProps)(Report)

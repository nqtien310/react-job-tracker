import React from 'react';
import { connect } from 'react-redux'
import ReportList from '../ReportList'

function Report(props){
  return (
    props.myUser ?
      <ReportList userId={props.myUser.id} />
      : null
  )
}

function mapStateToProps(state){
  return {
    myUser: state.myUser
  }
}

export default connect(mapStateToProps)(Report)

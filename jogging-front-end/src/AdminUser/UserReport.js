import React from 'react';
import Template from '../Template'
import { connect } from 'react-redux'
import ReportList from '../ReportList'

class Report extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <ReportList userId={this.props.match.params.userId} />
    )
  }
}

export default connect(null)(Report)

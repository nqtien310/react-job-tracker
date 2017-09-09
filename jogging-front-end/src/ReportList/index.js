import React from 'react';
import Template from '../Template'
import { connect } from 'react-redux'
import { fetchReports } from './state'

class Index extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount() {
    let userId = this.props.userId
    this.props.fetchReports(userId)
  }

  renderReports() {
    return this.props.reports.map((report,index) => {
      return (
        <tr key={index}>
          <td> {report.start_date} </td>
          <td> {report.end_date} </td>
          <td> {report.formatted_distance} </td>
          <td> {report.formatted_speed} </td>
        </tr>
      )
    })
  }

  _render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th> Start </th>
            <th> End </th>
            <th> Total distance </th>
            <th> Average speed </th>
          </tr>
        </thead>
        <tbody>
          {this.renderReports()}
        </tbody>
      </table>
    )
  }

  render(){
    if(this.props.reports.length == 0) {
      return (
        <Template>
          Not enough data for report
        </Template>
      )
    }else {
      return (
        <Template>
          {this._render()}
        </Template>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    reports: state.report.list
  }
}

export default connect(mapStateToProps, {
  fetchReports
})(Index)

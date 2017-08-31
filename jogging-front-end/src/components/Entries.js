import React from 'react';
import { connect } from 'react-redux'

class Entries extends React.Component{
  constructor(props) {
    super(props)
  }

  renderEntries() {
    return this.props.entries.map(entry => {
      return(
        <tr>
          <td>
            {entry.distance_in_metre} m
          </td>
          <td>
            {entry.speed} m/s
          </td>
          <td>
            {entry.time_in_second} s
          </td>
          <td>
            {entry.formatted_date}
          </td>
        </tr>
      )
    })
  }

  render(){
    return (
      <table className="table">
        <thead>
          <th>Distance</th>
          <th>Speed</th>
          <th>Time In Second</th>
          <th>Date</th>
        </thead>

        <tbody>
          {this.renderEntries()}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state){
  return {
    entries: state.entries
  }
}
export default connect(mapStateToProps)(Entries)

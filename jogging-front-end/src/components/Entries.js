import React from 'react';
import { connect } from 'react-redux'
import { deleteEntry } from '../epics/deleteEntryEpic'

class Entries extends React.Component{
  constructor(props) {
    super(props)
  }

  onDelete(id){
    this.props.deleteEntry(this.props.userId, id)
  }

  renderEntries() {
    return this.props.entries.map(entry => {
      return(
        <tr key={entry.id}>
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
          <td>
            <a onClick={()=> this.onDelete(entry.id)} className="btn btn-danger">Delete</a>
          </td>
        </tr>
      )
    })
  }

  render(){
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Distance</th>
            <th>Speed</th>
            <th>Time In Second</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
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
export default connect(mapStateToProps, {
  deleteEntry
})(Entries)

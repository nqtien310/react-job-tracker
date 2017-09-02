import React from 'react';
import { connect } from 'react-redux'
import { deleteEntry, showEditForm } from './state'

class List extends React.Component{
  constructor(props) {
    super(props)
  }

  onDelete(id){
    this.props.deleteEntry(this.props.userId, id)
  }

  onEdit(id){
    let entry = this.props.entries.find((e) => e.id == id)
    this.props.showEditForm(entry)
  }

  renderTable(){
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Distance</th>
            <th>Time</th>
            <th>Date</th>
            <th>Speed</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {this.renderEntries()}
        </tbody>
      </table>
    )
  }

  renderEntries() {
    return this.props.entries.map(entry => {
      return(
        <tr key={entry.id}>
          <td>
            {entry.distance_in_metre} m
          </td>
          <td>
            {entry.time_in_second} s
          </td>
          <td>
            {entry.formatted_date}
          </td>
          <td>
            {entry.speed} m/s
          </td>
          <td className="actions">
            <a onClick={()=> this.onDelete(entry.id)} className="btn btn-danger">Delete</a>
            <a onClick={()=> this.onEdit(entry.id)} className="btn btn-warning">Edit</a>
          </td>
        </tr>
      )
    })
  }

  render(){
    if(this.props.entries.length == 0){
      return (<div>No Entries created</div>)
    }else{
      return this.renderTable()
    }
  }
}

List = connect(null, {
  deleteEntry,
  showEditForm
})(List)
export default List

import React from 'react';
import { connect } from 'react-redux'
import { fetchEntries, deleteEntry, showEditForm } from './state'
import Entry from './Entry'

class List extends React.Component{
  constructor(props) {
    super(props)
  }

  onDelete = (id) => {
    this.props.deleteEntry(this.props.userId, id)
  }

  componentWillMount() {
    this.props.fetchEntries(this.props.userId)
  }

  onEdit = (id) => {
    let entry = this.props.entries.find((e) => e.id == id)
    this.props.showEditForm(entry)
  }

  renderTable(){
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Distance</th>
            <th>Time</th>
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
        <Entry key={entry.id} entry={entry}
          onDelete={this.onDelete}
          onEdit={this.onEdit}/>
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
  showEditForm,
  fetchEntries
})(List)
export default List

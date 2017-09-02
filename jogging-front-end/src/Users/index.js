import React from 'react';
import { connect } from 'react-redux'
import { fetchUsers } from './state'
import { Link } from 'react-router-dom'

class UsersList extends React.Component{
  componentWillMount(){
    this.props.fetchUsers()
  }

  onDelete() {
    console.log("DELETE")
  }

  onEdit() {
    console.log("EDIT")
  }

  renderUsers() {
    return this.props.users.map(user => {
      return(
        <tr key={user.id}>
          <td> {user.email} </td>
          <td> {user.full_name} </td>
          <td className="actions">
            <a onClick={()=> this.onDelete(user.id)} className="btn btn-danger">Delete</a>
            <Link to={`/users/${user.id}/edit`} className="btn btn-warning">Edit</Link>
            <Link to={`/users/${user.id}/entries`} className="btn btn-primary">Entries</Link>
            <Link to={`/users/${user.id}/report`} className="btn btn-primary">Report</Link>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {this.renderUsers()}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state){
  return {
    users: state.user.list
  }
}
export default connect(mapStateToProps, {
  fetchUsers
})(UsersList)

import React from 'react';
import { connect } from 'react-redux'
import { fetchUsers } from './state'

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
            <a onClick={()=> this.onEdit(user.id)} className="btn btn-warning">Edit</a>
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

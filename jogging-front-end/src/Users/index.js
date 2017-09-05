import React from 'react';
import { connect } from 'react-redux'
import { fetchUsers, deleteUser } from './state'
import { Link } from 'react-router-dom'

class UsersList extends React.Component{
  componentWillMount(){
    this.props.fetchUsers()
  }

  onDelete(userId) {
    this.props.deleteUser(userId)
  }

  renderEntriesActions(user) {
    if(this.props.myUser.role == "admin"){
      return (
        <td className="actions">
          <a onClick={()=> this.onDelete(user.id)} className="btn btn-danger">
            <i className="fa fa-trash"/>
          </a>
          <Link to={`/users/${user.id}/edit`} className="btn btn-warning">
            <i className="fa fa-edit"/>
          </Link>
          <Link to={`/users/${user.id}/entries`} className="btn btn-primary">
            <i className="fa fa-calendar"/>
          </Link>
          <Link to={`/users/${user.id}/report`} className="btn btn-primary">
            <i className="fa fa-bar-chart"/>
          </Link>
        </td>
      )
    }else {
      return (<td className="actions">
        <a onClick={()=> this.onDelete(user.id)} className="btn btn-danger">
          <i className="fa fa-trash"/>
        </a>
        <Link to={`/users/${user.id}/edit`} className="btn btn-warning">
          <i className="fa fa-edit"/>
        </Link>
      </td> )
    }
  }

  renderUsers() {
    return this.props.users.map(user => {
      return(
        <tr key={user.id}>
          <td> {user.email} </td>
          <td> {user.full_name} </td>
          {this.renderEntriesActions(user)}
        </tr>
      )
    })
  }

  render() {
    if(this.props.users.length == 0){
      return (
        <div> <div> No users created </div>

          <div className="action-footers">
            <Link to="/users/new" className="btn btn-primary">
              <i className="fa fa-plus"/>
            </Link>
          </div>
        </div>
      )
    }else {
      return (
        <div>
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

          <div className="action-footers">
            <Link to="/users/new" className="btn btn-primary">
              <i className="fa fa-plus"/>
            </Link>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    users: state.user.list
  }
}
export default connect(mapStateToProps, {
  fetchUsers,
  deleteUser
})(UsersList)

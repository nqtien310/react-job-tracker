import React from 'react';
import Template from '../Template'
import Form from './Form'
import { fetchUser, updateUser } from './state'
import { connect } from 'react-redux'

class EditForm extends React.Component {
  constructor(props){
    super(props)
    this.userId = this.props.match.params.userId
  }

  componentWillMount() {
    this.props.fetchUser(this.userId)
  }

  onSubmit = (params) => {
    this.props.updateUser(this.userId, params)
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} initialValues={this.props.selectedUser}/>
    )
  }
}

function mapStateToProps(state){
  return {
    selectedUser: state.user.selected
  }
}

export default connect(mapStateToProps, {
  fetchUser,
  updateUser
})(EditForm)

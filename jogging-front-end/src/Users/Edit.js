import React from 'react';
import Template from '../Template'
import Form from './Form'
import { fetchUser } from './state'
import { connect } from 'react-redux'

class EditForm extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    let userId = this.props.match.params.userId
    this.props.fetchUser(userId)
  }

  render() {
    return (
      <Form initialValues={this.props.selectedUser}/>
    )
  }
}

function mapStateToProps(state){
  return {
    selectedUser: state.user.selected
  }
}

export default connect(mapStateToProps, {
  fetchUser
})(EditForm)

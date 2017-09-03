import React from 'react';
import Form from '../Users/Form'
import { createUser } from '../Users/state'
import { connect } from 'react-redux'

function RegisterForm(props) {
  return (
    <Form
    submitLabel="Register"
    allowRoleEdit={true}
    onSubmit={props.createUser}/>
  )
}

export default connect(null, {createUser})(RegisterForm)

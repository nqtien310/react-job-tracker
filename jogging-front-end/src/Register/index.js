import React from 'react';
import Form from '../Users/Form'
import { createUser } from '../Users/state'
import { connect } from 'react-redux'
import { setSuccessMessage } from '../epics/successMessageEpic'

function RegisterForm(props) {
  return (
    <Form
    submitLabel="Register"
    allowRoleEdit={true}
    onSubmit={props.createUser}
    initialValues={{role: "user"}}/>
  )
}

export default connect(null, {createUser, setSuccessMessage})(RegisterForm)

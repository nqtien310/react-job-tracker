import React from 'react';
import Form from '../Users/Form'
import { createUser } from '../Users/state'
import { connect } from 'react-redux'

function NewForm(props) {
  return (
    <Form
      submitLabel="Create"
      allowRoleEdit={false}
      onSubmit={props.createUser}/>
  )
}

export default connect(null, {createUser})(NewForm)

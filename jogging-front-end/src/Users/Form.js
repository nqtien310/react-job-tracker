import React from 'react';
import Template from '../Template'
import { reduxForm } from 'redux-form'
import FieldsList from '../components/FieldsList'
import {Link} from 'react-router-dom'
import Submit from '../components/Submit'
import FormGroupAlignedRight from '../components/FormGroupAlignedRight'
import { createUser } from './state'
import { connect } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage'

function RegisterForm(props) {
  let fields = [
    {name: "email", label: "Email", type:"email", component: "input"},
    {name: "full_name", label: "Full Name", type:"text", component: "input"},
    {name: "password", label: "Password", type:"password", component: "input"},
    {name: "password_confirmation", label: "Confirm", type:"password", component: "input"}
  ]

  if(props.allowRoleEdit) {
    fields.push(
      {name: "role", label: "Role", type:"radio", component: "input", values: ["admin", "manager","user"]}
    )
  }

  return (
    <Template>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <ErrorMessage />
        <FieldsList fields={fields} focusOn="email"/>
        <Submit label={props.submitLabel} />
      </form>
    </Template>
  )
}

RegisterForm = reduxForm({
  form: 'login',
  enableReinitialize: true
})(RegisterForm)

RegisterForm = connect(null, {
  createUser
})(RegisterForm)

export default RegisterForm

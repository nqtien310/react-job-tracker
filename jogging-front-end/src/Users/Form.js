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
import Form from '../components/Form'
import './form.css'

class UserForm extends Form{
  fields() {
    let fields = [
      {name: "email", label: "Email", type:"email", component: "input"},
      {name: "full_name", label: "Full Name", type:"text", component: "input"},
      {name: "password", label: "Password", type:"password", component: "input"},
      {name: "password_confirmation", label: "Confirm", type:"password", component: "input"}
    ]

    if(this.props.allowRoleEdit) {
      fields.push(
        {name: "role", label: "Role", type:"radio", component: "input", values: ["admin", "manager","user"]}
      )
    }

    return fields
  }

  render() {
    return (
      <Template>
        <div id="user-form">
          <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
            <ErrorMessage />
            <FieldsList fields={this.fields()} focusOn="email"/>
            <Submit label={this.props.submitLabel} />
          </form>
        </div>
      </Template>
    )
  }
}

UserForm = reduxForm({
  form: 'login',
  enableReinitialize: true
})(UserForm)

UserForm = connect(null, {
  createUser
})(UserForm)

export default UserForm

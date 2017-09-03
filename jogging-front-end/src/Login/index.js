import React from 'react';
import Template from '../Template'
import { reduxForm } from 'redux-form'
import FieldsList from '../components/FieldsList'
import {Link} from 'react-router-dom'
import Submit from '../components/Submit'
import FormGroupAlignedRight from '../components/FormGroupAlignedRight'
import { submitLogin } from './state'
import { connect } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage'
import Form from '../components/Form'

class LoginForm extends Form {
  render() {
    return (
      <Template>
        <form onSubmit={this.props.handleSubmit(this.props.submitLogin)}>
          <ErrorMessage />
          <FieldsList fields={this.props.fields} focusOn="email"/>

          <FormGroupAlignedRight>
            Do not have account yet ?
            <Link to="/register"> register here </Link>
          </FormGroupAlignedRight>
          <Submit label="Login" />
        </form>
      </Template>
    )
  }
}

LoginForm = reduxForm({
  form: 'login',
  fields: [
    {name: "email", label: "Email", type:"email", component: "input"},
    {name: "password", label: "Password", type:"password", component: "input"}
  ]
})(LoginForm)

LoginForm = connect(null, {
  submitLogin
})(LoginForm)

export default LoginForm

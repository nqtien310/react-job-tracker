import React from 'react';
import Template from '../Template'
import { reduxForm } from 'redux-form'
import FieldsList from '../components/FieldsList'
import {Link} from 'react-router-dom'
import Submit from '../components/Submit'
import FormGroupAlignedRight from '../components/FormGroupAlignedRight'

function LoginForm(props) {
  function SubmitLogin(){
    console.log("?")
  }

  return (
    <Template>
      <form onSubmit={props.handleSubmit(SubmitLogin)}>
        <FieldsList fields={props.fields} focusOn="email"/>

        <FormGroupAlignedRight>
          Do not have account yet ?
          <Link to="/register"> register here </Link>
        </FormGroupAlignedRight>
        <Submit label="Login" />
      </form>
    </Template>
  )
}

LoginForm = reduxForm({
  form: 'login',
  fields: [
    {name: "email", label: "Email", type:"email", component: "input"},
    {name: "password", label: "Password", type:"password", component: "input"}
  ]
})(LoginForm)

export default LoginForm

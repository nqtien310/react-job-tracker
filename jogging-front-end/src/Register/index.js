import React from 'react';
import Template from '../Template'
import Form from '../Users/Form'
import { createUser } from '../Users/state'

export default function RegisterForm(props) {
  return (
    <Form onSubmit={this.props.createUser}/>
  )
}

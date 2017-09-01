import React from 'react'
import Template from '../Template'
import { reduxForm } from 'redux-form'
import FieldsList from '../components/FieldsList'
import Submit from '../components/Submit'
import ErrorMessage from '../components/ErrorMessage'
import { createEntry } from '../epics/createEntryEpic'
import { connect } from 'react-redux'

class EntryForm extends React.Component{
  constructor(props) {
    super(props)
  }

  onSubmit = (params) => {
    this.props.createEntry(this.props.match.params.userId, params)
  }

  render() {
    return (
      <Template>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <ErrorMessage />
          <FieldsList fields={this.props.fields} focusOn="email"/>

          <Submit label="Login" />
        </form>
      </Template>
    )
  }
}

EntryForm = reduxForm({
  form: 'entry',
  fields: [
    {name: "distance_in_metre", label: "Distance (m)", type:"text", component: "input"},
    {name: "time_in_second", label: "Time (s)", type:"text", component: "input"},
    {name: "date", label: "Date", type:"text", component: "input"}
  ]
})(EntryForm)

EntryForm = connect(null, {
  createEntry
})(EntryForm)

export default EntryForm

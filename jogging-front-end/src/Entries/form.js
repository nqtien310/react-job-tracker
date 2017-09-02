import React from 'react'
import Template from '../Template'
import { reduxForm,Field } from 'redux-form'
import FieldsList from '../components/FieldsList'
import Submit from '../components/Submit'
import ErrorMessage from '../components/ErrorMessage'
import { connect } from 'react-redux'
import { createEntry } from './state'

class EntryForm extends React.Component{
  constructor(props) {
    super(props)
  }

  onSubmit = (params) => {
    this.props.createEntry(this.props.userId, params)
  }

  renderFields() {
    return this.props.fields.map( (f) => {
      return (<td>
        <Field autoFocus={f.name=="distance_in_metre"} className="form-control"
          id={f.name}
          name={f.name}
          component={f.component}
          type={f.type}
        />
      </td>)
    })
  }

  render() {
    return (
      <form id="entry-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <table className="table">
          <tbody>
            <tr>
              {this.renderFields()}
              <td></td>
              <td>
                <Submit label="Save" />
              </td>
            </tr>
          </tbody>
        </table>

      </form>
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

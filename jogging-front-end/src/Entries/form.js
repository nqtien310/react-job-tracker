import React from 'react'
import Template from '../Template'
import { reduxForm,Field } from 'redux-form'
import FieldsList from '../components/FieldsList'
import Submit from '../components/Submit'
import ErrorMessage from '../components/ErrorMessage'
import { connect } from 'react-redux'
import { createEntry, updateEntry } from './state'
import DatePicker from 'react-datepicker'
import renderDatePicker from '../components/RenderDatePicker'

class EntryForm extends React.Component{
  constructor(props) {
    super(props)
  }

  onSubmit = (params) => {
    if(this.props.initialValues){
      this.props.updateEntry(this.props.userId
        , this.props.initialValues.id, params)
    } else{
      this.props.createEntry(this.props.userId, params)
    }
  }

  renderFields() {
    return this.props.fields.map( (f) => {
      return (<div className="field-container" key={f.name}>
        <Field autoFocus={f.name=="distance_in_metre"} className="form-control"
          placeholder={f.label}
          id={f.name}
          name={f.name}
          component={f.component}
          type={f.type}
        />
      </div>)
    })
  }

  render() {
    return (
      <form id="entry-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="display-inline">
          {this.renderFields()}
          <a onClick={this.props.handleSubmit(this.onSubmit)} className="btn btn-primary">Save</a>
        </div>
      </form>
    )
  }
}

EntryForm = reduxForm({
  form: 'entry',
  enableReinitialize: true,
  fields: [
    {name: "distance_in_metre", label: "Distance (m)", type:"number", component: "input"},
    {name: "time_in_second", label: "Time (s)", type:"number", component: "input"},
    {name: "date", label: "Date", type:"text", component: renderDatePicker}
  ]
})(EntryForm)

EntryForm = connect(null, {
  createEntry,
  updateEntry
})(EntryForm)

export default EntryForm

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
import Form from '../components/Form'
import moment from 'moment'
import renderTimePicker from '../components/RenderTimePicker'

class EntryForm extends Form{
  constructor(props){
    super(props)
    this.state = {
      formattedTime: null
    }
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
      </div>)
    })
  }

  renderField(f, onKeyUp=null){
    return (
      <Field autoFocus={f.name=="distance_in_metre"} className="form-control"
        placeholder={f.label}
        id={f.name}
        name={f.name}
        component={f.component}
        parse={f.parse}
        onKeyUp={onKeyUp}
        type={f.type}
      />
    )
  }

  onKeyUp = (e) => {
    if(e.currentTarget.value){
      let second = parseInt(e.currentTarget.value)
      let formatted = moment.utc(second*1000).format('HH:mm:ss');
      this.setState({formattedTime: formatted})
    }
  }

  render() {
    return (
      <form id="entry-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="field-container" key="0" >
          {this.renderField(this.props.fields[0])}
        </div>
        <div className="field-container time" key="1" >
          {this.renderField(this.props.fields[1])}
        </div>
        <div className="field-container" key="2" >
          {this.renderField(this.props.fields[2])}
        </div>

        <div className="field-container" key="3">
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
    {name: "readable_time",
      label: "Time (s)",
      type:"number",
      component: renderTimePicker,
      parse: moment => (moment.format("HH:mm:ss"))
    },
    {name: "date", label: "Date", type:"text", component: renderDatePicker}
  ]
})(EntryForm)

EntryForm = connect(null, {
  createEntry,
  updateEntry
})(EntryForm)

export default EntryForm

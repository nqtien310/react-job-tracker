import React from 'react';
import { connect } from 'react-redux'
import { deleteEntry, showCreateForm } from './state'
import List from './list'
import Form from './form'
import ErrorMessage from '../components/ErrorMessage'
import './index.css'
import DatePicker from 'react-datepicker'
import { Field } from 'redux-form'
import moment from 'moment'
import { Link } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'

class Entries extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      from: null,
      to: null
    }
  }

  handleChange(type, date) {
    this.setState({[type]: date})
  }

  filterFromTo(){
    let entries = this.props.entry.list
    let format  = "YYYY-MM-DD"

    if(this.state.from){
      entries = entries.filter(e =>{
        return moment(e.date, format) >= this.state.from
      })
    }

    if(this.state.to){
      entries = entries.filter(e =>{
        return moment(e.date, format) <= this.state.to
      })
    }

    return entries
  }

  render(){
    let entries = this.filterFromTo()

    return (
      <div>
        <div className="date-filters">
          Filters:
          <DatePicker placeholderText="From.."
            className="form-control date-filter"
            onChange={date => this.handleChange("from", date)}
            selected={this.state.from} />

          <DatePicker placeholderText="To.."
            reportLink={this.props.reportLink}
            className="form-control date-filter"
            onChange={date => this.handleChange("to", date)}
            selected={this.state.to} />
        </div>

        <ErrorMessage />
        <List userId={this.props.userId} entries={entries}/>
        {this.props.entry.form.action ? <Form initialValues={this.props.entry.form.editing} userId={this.props.userId}/> : null}

        <Link to={this.props.reportLink}>Report by week</Link>
        <div className="action-footers">
          <a onClick={this.props.showCreateForm} className="btn btn-primary">
            <i className="fa fa-plus"/>
          </a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    entry: state.entry
  }
}
export default connect(mapStateToProps, {
  deleteEntry,
  showCreateForm
})(Entries)

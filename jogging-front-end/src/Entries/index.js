import React from 'react';
import { connect } from 'react-redux'
import { deleteEntry, showCreateForm } from './state'
import List from './list'
import Form from './form'
import './index.css'

class Entries extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <div>
        <a onClick={this.props.showCreateForm} className="btn btn-primary">Add</a>
        <List userId={this.props.userId} entries={this.props.entry.list}/>
        {this.props.entry.form.action ? <Form initialValues={this.props.entry.form.editing} userId={this.props.userId}/> : null}
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

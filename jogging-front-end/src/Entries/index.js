import React from 'react';
import { connect } from 'react-redux'
import { deleteEntry } from '../epics/deleteEntryEpic'
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
        <List userId={this.props.userId} entries={this.props.entries}/>
        <Form/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    entries: state.entries
  }
}
export default connect(mapStateToProps, {
  deleteEntry
})(Entries)

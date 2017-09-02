import React from 'react';
import { connect } from 'react-redux'
import { deleteEntry } from './state'
import List from './list'
import Form from './form'
import './index.css'

class Entries extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
  }
  showForm = () => {
    this.setState({showForm: true})
  }

  render(){
    return (
      <div>
        <a onClick={this.showForm} className="btn btn-primary">Add</a>
        <List userId={this.props.userId} entries={this.props.entry.list}/>
        {this.state.showForm ? <Form userId={this.props.userId}/> : null}
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
  deleteEntry
})(Entries)

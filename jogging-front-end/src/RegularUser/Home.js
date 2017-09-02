import React from 'react';
import Entries from '../Entries'
import { fetchEntries } from '../Entries/state'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Home extends React.Component{
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    this.props.fetchEntries(this.props.myUser.id)
  }

  render() {
    return (
      <div>
        <Entries userId={this.props.myUser.id}/>
      </div>
    )
  }
}

export default connect(null, { fetchEntries })(Home)

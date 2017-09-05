import React from 'react';
import Entries from '../Entries'
import { fetchEntries } from '../Entries/state'
import { connect } from 'react-redux'
import Template from '../Template'

class Home extends React.Component{
  constructor(props) {
    super(props)
    this.userId = this.props.match.params.userId
  }

  render() {
    return (
      <Template>
        <Entries reportLink={`/users/${this.userId}/report`} userId={this.userId}/>
      </Template>
    )
  }
}

export default connect(null, { fetchEntries })(Home)

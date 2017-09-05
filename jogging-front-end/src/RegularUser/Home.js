import React from 'react';
import Entries from '../Entries'
import { fetchEntries } from '../Entries/state'
import { connect } from 'react-redux'

class Home extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Entries reportLink="/report" userId={this.props.myUser.id}/>
      </div>
    )
  }
}

export default connect(null, { fetchEntries })(Home)

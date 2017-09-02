import React from 'react';
import Entries from '../Entries'
import { fetchEntries } from '../Entries/state'
import { connect } from 'react-redux'
import Template from '../Template'

class Home extends React.Component{
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    this.props.fetchEntries(this.props.match.params.userId)
  }

  render() {
    return (
      <Template>
        <Entries userId={this.props.match.params.userId}/>
      </Template>
    )
  }
}

export default connect(null, { fetchEntries })(Home)

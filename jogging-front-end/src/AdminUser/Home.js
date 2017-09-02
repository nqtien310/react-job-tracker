import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UsersList from '../UsersList'

class Home extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <UsersList />
      </div>
    )
  }
}

export default connect(null,{  })(Home)

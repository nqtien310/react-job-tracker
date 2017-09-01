import React from 'react';
import Entries from '../Entries'
import { fetchEntries } from '../epics/fetchEntriesEpic'
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
        <Link to={`/user/${this.props.myUser.id}/entries/new`}className="btn btn-primary">Add</Link>
        <Entries userId={this.props.myUser.id}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    myUser: state.myUser
  }
}
export default connect(mapStateToProps,{
  fetchEntries

})(Home)

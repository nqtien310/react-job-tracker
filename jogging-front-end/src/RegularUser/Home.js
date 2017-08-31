import React from 'react';
import Entries from '../components/Entries'
import { fetchEntries } from '../epics/fetchEntriesEpic'
import { connect } from 'react-redux'

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
        <Entries/>
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

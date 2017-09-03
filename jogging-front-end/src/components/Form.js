import React from 'react'
import setErrorMessage from '../actions/setErrorMessage'
const PropTypes = require('prop-types');

class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount(){
    console.log("???????????????")
    this.context.store.dispatch(setErrorMessage(null))
  }
}

Form.contextTypes = {
  store: React.PropTypes.object
}

export default Form

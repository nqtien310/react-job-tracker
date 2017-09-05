import React from 'react'
import setErrorMessage from '../actions/setErrorMessage'
import PropTypes from 'prop-types'

class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillUnmount(){
    this.context.store.dispatch(setErrorMessage(null))
  }
}

Form.contextTypes = {
  store: PropTypes.object
}

export default Form

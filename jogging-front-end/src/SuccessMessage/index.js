import React from 'react'
import { connect } from 'react-redux'
import './index.css'

function SuccessMessage(props) {
  if(props.successMessage) {
    return(
      <div id="success-message" className="alert alert-success">
        {props.successMessage}
      </div>
    )
  }else {
    return null
  }
}

function mapStateToProps(state) {
  return {
    successMessage: state.successMessage
  }
}

export default connect(mapStateToProps)(SuccessMessage)

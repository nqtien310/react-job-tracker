import React, {Component} from 'react';
import {connect} from 'react-redux';

class ErrorMessage extends Component {
  constructor(props) {
    super(props)
  }

  renderErrorMessages() {
    return this.props.errorMessage.split("\\n").map( (message) => {
      return <li key={message}> {message} </li>
    })
  }


  render(){
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <ul>
            {this.renderErrorMessages()}
          </ul>
        </div>
      )
    }else {
      return (
        <div></div>
      )
    }
  }
}

ErrorMessage = connect((state)=> {
  return {
    errorMessage: state.errorMessage
  }
})(ErrorMessage)
export default ErrorMessage

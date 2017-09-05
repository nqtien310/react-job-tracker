import React from 'react';
import { connect } from 'react-redux'

function NavBar(props) {
  return (
    <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="#">
        <i className="fa fa-home" />
      </a>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {props.children}
        </ul>
      </div>
    </nav>
  )
}

function mapStateToProps(state){
  return {
    successMessage: state.successMessage
  }
}

export default connect(mapStateToProps)(NavBar)

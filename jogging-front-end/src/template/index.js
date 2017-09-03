import React from 'react';
import Header from './Header'
import Footer from './Footer'
import './template.css'
import SuccessMessage from '../SuccessMessage'
import {Link, withRouter} from 'react-router-dom'

function Template(props){
  const pagesWithoutBackBtn = ['/','/register']

  function isHidingBackBtn(){
    return pagesWithoutBackBtn.find((page) => page === props.match.path)
  }

  function displayBackButton(){
    if(isHidingBackBtn()){
      return null
    }else {
      return (
        <div className="top-actions-container">
          <a className="back-btn btn btn-info" onClick={props.history.goBack}>Back</a>
        </div>
      )
    }
  }

  return(
    <div>
      <Header/>
      <div id="body">
        {displayBackButton()}
        <SuccessMessage />
        {props.children}
      </div>
    </div>
  )
}

export default withRouter(Template)

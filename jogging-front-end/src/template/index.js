import React from 'react';
import Header from './Header'
import Footer from './Footer'
import './template.css'
import SuccessMessage from '../SuccessMessage'

function Template(props){
  return(
    <div>
      <Header/>
      <div id="body">
        <SuccessMessage />
        {props.children}
      </div>
    </div>
  )
}

export default Template

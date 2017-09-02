import React from 'react';
import Header from './Header'
import Footer from './Footer'
import './template.css'

export default function Template(props){
  return(
    <div>
      <Header/>
      <div id="body">
        {props.children}
      </div>
    </div>
  )
}

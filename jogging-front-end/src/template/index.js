import React from 'react';
import Header from './Header'
import Footer from './Footer'

export default function Template(props){
  return(
    <div>
      <Header/>
      <div id="body">
        {props.children}
      </div>
      <Footer/>
    </div>
  )
}

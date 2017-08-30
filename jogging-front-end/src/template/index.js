import React, { Component } from 'react';
import Header from './Header'

export default function Template(props){
  return(
    <div>
      <Header/>
      {props.children}
    </div>
  )
}

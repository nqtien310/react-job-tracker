import React from 'react';
import {  Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'

export default function Router() {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
    </div>
  )
}

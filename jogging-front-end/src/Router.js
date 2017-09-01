import React from 'react';
import {  Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import EntryForm from './EntryForm'

export default function Router() {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/entries" component={Login}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/user/:userId/entries/new" component={EntryForm}/>
    </div>
  )
}

import React from 'react';
import {  Route } from 'react-router-dom'
import Home from './Home'
import MyReport from './RegularUser/Report'
import Login from './Login'
import UserEntries from './AdminUser/UserEntries'
import UserReport from './AdminUser/UserReport'

export default function Router() {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/report" component={MyReport}/>
      <Route exact path="/users/:userId/entries" component={UserEntries}/>
      <Route exact path="/users/:userId/report" component={UserReport}/>
    </div>
  )
}

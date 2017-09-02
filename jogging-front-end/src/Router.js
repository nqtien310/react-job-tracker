import React from 'react';
import {  Route } from 'react-router-dom'
import Home from './Home'
import MyReport from './RegularUser/Report'
import Login from './Login'
import Register from './Register'
import UserEntries from './AdminUser/UserEntries'
import UserReport from './AdminUser/UserReport'
import UserEdit from './Users/Edit'
import PrivateRoute from './PrivateRoute'

export default function Router() {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/register" component={Register}/>
      <PrivateRoute roles={['user']} exact path="/report" component={MyReport}/>

      <PrivateRoute roles={['admin']} exact path="/users/:userId/entries" component={UserEntries}/>
      <PrivateRoute roles={['admin']} exact path="/users/:userId/report" component={UserReport}/>

      <PrivateRoute roles={['admin', 'manager']} exact path="/users/:userId/edit" component={UserEdit}/>
      <PrivateRoute roles={['admin', 'manager']} exact path="/users/new" component={Register}/>
    </div>
  )
}

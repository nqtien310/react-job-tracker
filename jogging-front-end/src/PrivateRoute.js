import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import Auth from './auth'

const PrivateRoute = ({component: Component, roles: roles, ...rest}) => {
  function isAuthenticated() {
    let role = Auth.getRole()
    return !!(role && roles.find(r => r === role))
  }

  return <Route {...rest} render={props => (
      isAuthenticated() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
}

export default PrivateRoute

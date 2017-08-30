import React from 'react';
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Route } from 'react-router-dom'

export default function ConfigurableWrapper(props) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {props.children}
      </BrowserRouter>
    </Provider>
  )
}


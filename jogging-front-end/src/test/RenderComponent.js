import React from 'react';
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store, browserHistory } from '../store'
import { Login } from '../Login'

export {store}

export default function RenderComponent(props) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']} initialIndex={1}>
        {props.children}
      </MemoryRouter>
    </Provider>
  )
}

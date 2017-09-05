import React from 'react';
import renderer from 'react-test-renderer'
import LoginForm from '../Login'
import RenderComponent, {store} from './RenderComponent'
import {submitLogin} from '../Login/state'
import {stubApiError} from './ApiStubs'

it('renders Login Form', () => {
  const component = renderer.create(
    <RenderComponent>
      <LoginForm/>
    </RenderComponent>
  )

  expect(component).toMatchSnapshot()
});


it('renders error message when login failed', (done) => {
  stubApiError("post", {"message" : "Invalid username or password"})

  store.dispatch(submitLogin({}))

  setTimeout( () => {
    const component = renderer.create(
      <RenderComponent>
        <LoginForm/>
      </RenderComponent>
    )
    expect(component).toMatchSnapshot()
    done()
  }, 50)
});


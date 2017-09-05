import React from 'react';
import renderer from 'react-test-renderer'
import RenderComponent, {store} from './RenderComponent'
import RegisterForm from '../Register'
import { Api } from '../api'
import { createUser } from '../Users/state'
import {stubApiError} from './ApiStubs'

it('Register Form', () => {
  const component = renderer.create(
    <RenderComponent>
      <RegisterForm/>
    </RenderComponent>
  )

  expect(component).toMatchSnapshot()
});

it('displays error when register failed', (done) => {
  stubApiError("post", {"message" : "Email has already been taken"})
  store.dispatch(createUser({}))

  setTimeout( () => {
    let component = renderer.create(
      <RenderComponent>
        <RegisterForm/>
      </RenderComponent>
    )
    expect(component).toMatchSnapshot()
    done()
  }, 50)
})

import React from 'react';
import renderer from 'react-test-renderer'
import LoginForm from '../Login'
import RenderComponent from './RenderComponent'

it('Login Form', () => {
  const component = renderer.create(
    <RenderComponent>
      <LoginForm/>
    </RenderComponent>
  )

  expect(component).toMatchSnapshot()
});


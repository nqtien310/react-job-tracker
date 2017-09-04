import React from 'react';
import renderer from 'react-test-renderer'
import RenderComponent from './RenderComponent'
import RegisterForm from '../Register'

it('Register Form', () => {
  const component = renderer.create(
    <RenderComponent>
      <RegisterForm/>
    </RenderComponent>
  )

  expect(component).toMatchSnapshot()
});

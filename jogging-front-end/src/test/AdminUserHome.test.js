import React from 'react';
import renderer from 'react-test-renderer'
import LoginForm from '../Login'
import RenderComponent from './RenderComponent'
import { store } from './RenderComponent'
import Home from '../AdminUser/Home'
import { fetchedUsers } from '../Users/state'

it('No User created', () => {
  const component = renderer.create(
    <RenderComponent>
      <Home myUser={{id: 1}}/>
    </RenderComponent>
  )

  expect(component).toMatchSnapshot()
});

it('With Users', () => {
  const component = renderer.create(
    <RenderComponent>
      <Home myUser={{id: 1}}/>
    </RenderComponent>
  )
  let action = fetchedUsers(
    {data: [{"id":43,"email":"nqtien310@gmail.com","full_name":"Tien Nguyen","role":"user"}]}
  )
  store.dispatch(action)

  expect(component).toMatchSnapshot()
});

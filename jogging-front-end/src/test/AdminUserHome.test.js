import React from 'react';
import renderer from 'react-test-renderer'
import LoginForm from '../Login'
import RenderComponent from './RenderComponent'
import { store } from './RenderComponent'
import Home from '../AdminUser/Home'
import { fetchedUsers } from '../Users/state'
import { stubApiSuccess } from './ApiStubs.js'

it('No User created', (done) => {
  stubApiSuccess("get", [])

  const component = renderer.create(
    <RenderComponent>
      <Home myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout( () => {
    expect(component).toMatchSnapshot()
    done()
  }, 50)
});

it('With Users', (done) => {
  let data = [{"id":43,"email":"nqtien310@gmail.com","full_name":"Tien Nguyen","role":"user"}]
  stubApiSuccess("get", data)

  const component = renderer.create(
    <RenderComponent>
      <Home myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout( () => {
    expect(component).toMatchSnapshot()
    done()
  }, 50)
});

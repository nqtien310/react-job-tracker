import React from 'react';
import renderer from 'react-test-renderer'
import LoginForm from '../Login'
import RenderComponent from './RenderComponent'
import { store } from './RenderComponent'
import UsersList from '../Users'
import { fetchUsers, createUser, updateUser, deleteUser } from '../Users/state'
import { stubApiSuccess } from './ApiStubs.js'

it('No User created', (done) => {
  stubApiSuccess("get", [])

  const component = renderer.create(
    <RenderComponent>
      <UsersList myUser={{id: 1}}/>
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
      <UsersList myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout( () => {
    expect(component).toMatchSnapshot()
    done()
  }, 50)
});

it('Delete', (done) => {
  let data = [{"id":43,"email":"nqtien310@gmail.com","full_name":"Tien Nguyen","role":"user"}]
  stubApiSuccess("get", data)

  const component = renderer.create(
    <RenderComponent>
      <UsersList myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout( () => {
    expect(component).toMatchSnapshot()
    let dataAfter = []
    stubApiSuccess("get", dataAfter)
    stubApiSuccess("delete", null)
    store.dispatch(deleteUser(43))

    setTimeout ( () => {
      expect(component).toMatchSnapshot()
      done()
    }, 50)
  }, 50)
});

it('Update', (done) => {
  let data = [{"id":43,"email":"nqtien310@gmail.com","full_name":"Tien Nguyen","role":"user"}]
  stubApiSuccess("get", data)

  const component = renderer.create(
    <RenderComponent>
      <UsersList myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout( () => {
    expect(component).toMatchSnapshot()
    let dataAfter = [{"id":43,"email":"updated@gmail.com","full_name":"Tien Nguyen","role":"user"}]
    stubApiSuccess("get", dataAfter)
    stubApiSuccess("put", {})
    store.dispatch(updateUser(43,{}))
    store.dispatch(fetchUsers())

    setTimeout ( () => {
      expect(component).toMatchSnapshot()
      done()
    }, 50)
  }, 50)
});

it('Create', (done) => {
  let data = [{"id":43,"email":"nqtien310@gmail.com","full_name":"Tien Nguyen","role":"user"}]
  stubApiSuccess("get", data)

  const component = renderer.create(
    <RenderComponent>
      <UsersList myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout( () => {
    expect(component).toMatchSnapshot()
    let dataAfter = [
      {"id":43,"email":"nqtien31@gmail.com","full_name":"Tien Nguyen","role":"user"},
      {"id":44,"email":"new@gmail.com","full_name":"New","role":"user"}
    ]
    stubApiSuccess("get", dataAfter)
    stubApiSuccess("post", {})
    store.dispatch(createUser(43,{}))
    store.dispatch(fetchUsers())

    setTimeout ( () => {
      expect(component).toMatchSnapshot()
      done()
    }, 50)
  }, 50)
});

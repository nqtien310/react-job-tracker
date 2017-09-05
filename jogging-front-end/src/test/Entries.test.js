import React from 'react';
import renderer from 'react-test-renderer'
import LoginForm from '../Login'
import RenderComponent from './RenderComponent'
import { store } from './RenderComponent'
import Entries from '../Entries'
import { stubApiSuccess } from './ApiStubs'
import { createEntry, updateEntry, deleteEntry } from '../Entries/state'

it('Listing (No Entries)', (done) => {
  stubApiSuccess("get", [])

  const component = renderer.create(
    <RenderComponent>
      <Entries reportLink="/report" myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout(() => {
    expect(component).toMatchSnapshot()
    done()
  },50)
});

it('Listing (With entries)', (done) => {
  let data = [
    {"id":42,"time_in_second":100,"distance_in_metre":100.0,"formatted_date":"2017-09-03","speed":1.0,"date":"2017-09-03"},
    {"id":43,"time_in_second":200,"distance_in_metre":200.0,"formatted_date":"2017-09-06","speed":1.0,"date":"2017-09-06"}
  ]

  stubApiSuccess("get", data)

  const component = renderer.create(
    <RenderComponent>
      <Entries reportLink="/report" myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout(() => {
    expect(component).toMatchSnapshot()
    done()
  },50)
});

it('Delete entry', (done) => {
  let data = [
    {"id":42,"time_in_second":100,"distance_in_metre":100.0,"formatted_date":"2017-09-03","speed":1.0,"date":"2017-09-03"},
    {"id":43,"time_in_second":200,"distance_in_metre":200.0,"formatted_date":"2017-09-06","speed":1.0,"date":"2017-09-06"}
  ]

  stubApiSuccess("get", data)

  const component = renderer.create(
    <RenderComponent>
      <Entries reportLink="/report" myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout(() => {
    let dataAfterDelete = [
      {"id":43,"time_in_second":200,"distance_in_metre":200.0,"formatted_date":"2017-09-06","speed":1.0,"date":"2017-09-06"}
    ]

    expect(component).toMatchSnapshot()
    stubApiSuccess("get", dataAfterDelete)
    stubApiSuccess("delete", null)
    store.dispatch(deleteEntry(1,42))

    setTimeout(() => {
      expect(component).toMatchSnapshot()
      done()
    }, 50)
  },50)
});

it('Update entry', (done) => {
  let data = [
    {"id":43,"time_in_second":200,"distance_in_metre":200.0,"formatted_date":"2017-09-06","speed":1.0,"date":"2017-09-06"}
  ]

  stubApiSuccess("get", data)

  const component = renderer.create(
    <RenderComponent>
      <Entries reportLink="/report" myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout(() => {
    let dataAfterUpdate = [
      {"id":43,"time_in_second":500,"distance_in_metre":500.0,"formatted_date":"2017-09-06","speed":1.0,"date":"2017-09-06"}
    ]

    expect(component).toMatchSnapshot()
    stubApiSuccess("get", dataAfterUpdate)
    stubApiSuccess("put", null)
    store.dispatch(updateEntry(1,42, {}))

    setTimeout(() => {
      expect(component).toMatchSnapshot()
      done()
    }, 50)
  },50)
});

it('Create entry', (done) => {
  let data = [
    {"id":42,"time_in_second":100,"distance_in_metre":100.0,"formatted_date":"2017-09-03","speed":1.0,"date":"2017-09-03"},
    {"id":43,"time_in_second":200,"distance_in_metre":200.0,"formatted_date":"2017-09-06","speed":1.0,"date":"2017-09-06"}
  ]

  stubApiSuccess("get", data)

  const component = renderer.create(
    <RenderComponent>
      <Entries reportLink="/report" myUser={{id: 1}}/>
    </RenderComponent>
  )

  setTimeout(() => {
    let dataAfterUpdate = [
      {"id":42,"time_in_second":100,"distance_in_metre":100.0,"formatted_date":"2017-09-03","speed":1.0,"date":"2017-09-03"},
      {"id":43,"time_in_second":200,"distance_in_metre":200.0,"formatted_date":"2017-09-06","speed":1.0,"date":"2017-09-06"},
      {"id":44,"time_in_second":300,"distance_in_metre":300.0,"formatted_date":"2017-09-09","speed":1.0,"date":"2017-09-09"}
    ]

    expect(component).toMatchSnapshot()
    stubApiSuccess("get", dataAfterUpdate)
    stubApiSuccess("post", null)
    store.dispatch(createEntry(1,{}))

    setTimeout(() => {
      expect(component).toMatchSnapshot()
      done()
    }, 50)
  },50)
});

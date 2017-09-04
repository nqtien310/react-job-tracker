import React from 'react';
import renderer from 'react-test-renderer'
import LoginForm from '../Login'
import RenderComponent from './RenderComponent'
import { store } from './RenderComponent'
import Home from '../RegularUser/Home'
import { fetchedEntries } from '../Entries/state'

it('Regular User Home (No Entries)', () => {
  const component = renderer.create(
    <RenderComponent>
      <Home myUser={{id: 1}}/>
    </RenderComponent>
  )

  expect(component).toMatchSnapshot()
});

it('Regular User Home (With Entries)', () => {
  const component = renderer.create(
    <RenderComponent>
      <Home myUser={{id: 1}}/>
    </RenderComponent>
  )
  let action = fetchedEntries(
    {data: [{"id":42,"time_in_second":100,"distance_in_metre":100.0,"formatted_date":"2017-09-03","speed":1.0,"date":"2017-09-03"},
        {"id":43,"time_in_second":200,"distance_in_metre":200.0,"formatted_date":"2017-09-06","speed":1.0,"date":"2017-09-06"}]
    }
  )
  store.dispatch(action)
  expect(component).toMatchSnapshot()
});

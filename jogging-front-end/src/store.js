import { createStore, applyMiddleware } from 'redux'
import Reducers from './reducers'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './epics'

const epicMiddleware = createEpicMiddleware(rootEpic)

export let store = createStore(
  Reducers,
  applyMiddleware(epicMiddleware)
)


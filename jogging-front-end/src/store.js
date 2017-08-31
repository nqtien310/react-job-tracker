import { createStore, applyMiddleware } from 'redux'
import Reducers from './reducers'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './epics'
import { composeWithDevTools } from 'redux-devtools-extension'

const epicMiddleware = createEpicMiddleware(rootEpic)

export let store = createStore(
  Reducers,
  composeWithDevTools(
    applyMiddleware(epicMiddleware)
  )
)


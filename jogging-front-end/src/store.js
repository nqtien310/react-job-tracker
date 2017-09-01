import { createStore, applyMiddleware } from 'redux'
import Reducers from './reducers'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './epics'
import { composeWithDevTools } from 'redux-devtools-extension';
import createBrowserHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

export const browserHistory = createBrowserHistory()

const epicMiddleware = createEpicMiddleware(rootEpic)
const pushMiddleware = routerMiddleware(browserHistory)

export let store = createStore(
  Reducers,

  composeWithDevTools(
    applyMiddleware(epicMiddleware, pushMiddleware),
  )
)


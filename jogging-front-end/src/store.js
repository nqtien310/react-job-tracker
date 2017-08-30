import { createStore } from 'redux'
import Reducers from './reducers'

export let store = createStore(
  Reducers
)


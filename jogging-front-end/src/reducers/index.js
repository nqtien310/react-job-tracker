import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { myUserReducer } from '../epics/fetchMyUserEpic'
import errorMessageReducer from './errorMessageReducer'
import tokenReducer from './tokenReducer'
import {entriesReducer} from '../epics/fetchEntriesEpic'

let indexReducer = combineReducers({
  form: formReducer,
  myUser: myUserReducer,
  token: tokenReducer,
  errorMessage: errorMessageReducer,
  entries: entriesReducer
})

export default indexReducer

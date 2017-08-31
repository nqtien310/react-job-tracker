import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { myUserReducer } from '../epics/fetchMyUserEpic'
import errorMessageReducer from './errorMessageReducer'
import tokenReducer from './tokenReducer'

let indexReducer = combineReducers({
  form: formReducer,
  myUser: myUserReducer,
  token: tokenReducer,
  errorMessage: errorMessageReducer
})

export default indexReducer

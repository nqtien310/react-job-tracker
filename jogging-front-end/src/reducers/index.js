import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUserReducer from './current_user_reducer'
import errorMessageReducer from './errorMessageReducer'
import tokenReducer from './tokenReducer'

let indexReducer = combineReducers({
  form: formReducer,
  currentUser: currentUserReducer,
  token: tokenReducer,
  errorMessage: errorMessageReducer
})

export default indexReducer

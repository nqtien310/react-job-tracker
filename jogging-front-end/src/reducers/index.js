import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import currentUserReducer from './current_user_reducer'

let indexReducer = combineReducers({
  form: formReducer,
  currentUser: currentUserReducer
})

export default indexReducer

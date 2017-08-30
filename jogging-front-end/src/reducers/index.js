import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

let indexReducer = combineReducers({
  form: formReducer
})

export default indexReducer

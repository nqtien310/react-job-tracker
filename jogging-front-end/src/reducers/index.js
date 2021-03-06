import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { myUserReducer } from '../epics/fetchMyUserEpic'
import errorMessageReducer from './errorMessageReducer'
import tokenReducer from './tokenReducer'
import {entryReducer} from '../Entries/state.js'
import { routerReducer } from 'react-router-redux'
import { reportReducer } from '../ReportList/state.js'
import { userReducer } from '../Users/state.js'
import { successMessageReducer } from '../epics/successMessageEpic'

let indexReducer = combineReducers({
  form: formReducer,
  myUser: myUserReducer,
  token: tokenReducer,
  errorMessage: errorMessageReducer,
  routing: routerReducer,
  entry: entryReducer,
  report: reportReducer,
  user: userReducer,
  successMessage: successMessageReducer
})

export default indexReducer

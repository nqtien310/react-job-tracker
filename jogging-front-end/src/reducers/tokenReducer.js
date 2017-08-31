import {SETTOKEN} from '../Login/state'
import {CLEARTOKEN} from '../epics/logout'
import Auth from '../auth'

export default function tokenReducer(state=null, action){
  switch(action.type){
    case SETTOKEN: {
      Auth.setToken(action.payload.data.token)
      return "SET"
    } case CLEARTOKEN: {
      Auth.clearToken()
      return null
    }default: {
      return state
    }
  }
}

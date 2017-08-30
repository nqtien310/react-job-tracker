import {SETTOKEN} from '../Login/state'
import Auth from '../auth'

export default function tokenReducer(state=null, action){
  switch(action.type){
    case SETTOKEN: {
      Auth.setToken(action.payload.data.token)
      return "SET"
    }default: {
      return state
    }
  }
}

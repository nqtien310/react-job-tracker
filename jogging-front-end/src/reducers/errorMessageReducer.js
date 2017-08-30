import { SET_ERROR_MESSAGE } from '../actions/ErrorActions'

export default function ErrorMessageReducer(state=null, action) {
  switch(action.type){
    case SET_ERROR_MESSAGE: {
      return action.payload
    }
    default: {
      return state
    }
  }
}

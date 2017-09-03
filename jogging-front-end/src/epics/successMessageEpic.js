import Rx from 'rxjs'
const CLEAR_SUCCESS_MESSAGE = 'CLEAR_SUCCESS_MESSAGE'
const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE'

export const clearSuccessMessage = () => {
  return {
    type: CLEAR_SUCCESS_MESSAGE
  }
}

export const setSuccessMessage = (message) => {
  return {
    type: SET_SUCCESS_MESSAGE,
    payload: message
  }
}

export function successMessageReducer(state=null, action){
  switch(action.type){
    case SET_SUCCESS_MESSAGE: {
      return action.payload
    }case CLEAR_SUCCESS_MESSAGE: {
      return null
    }default: {
      return state
    }
  }
}

export default function successMessageEpic(action$){
  return action$.ofType(SET_SUCCESS_MESSAGE).switchMap( action =>  {
    return Rx.Observable.of(clearSuccessMessage()).delay(5000)
  })
}

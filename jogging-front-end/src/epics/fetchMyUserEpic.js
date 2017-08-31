import api from '../api'
import Rx from 'rxjs/Rx'

const DONE_FETCHING_MY_USER = 'DONE_FETCHING_MY_USER'
const UNSET_MY_USER         = 'UNSET_MY_USER'
const FETCH_MY_USER         = 'FETCH_MY_USER'

//Reducers
export function myUserReducer(state=null, action){
  switch(action.type){
    case DONE_FETCHING_MY_USER: {
      return action.payload.data
    }
    case UNSET_MY_USER: {
      return null
    }
    default: {
      return state
    }
  }
}

//Action creators
export const doneFetchingMyUser = user => ({type: DONE_FETCHING_MY_USER, payload: user})
export const fetchMyUser = () => ({type: FETCH_MY_USER})
export const unsetMyUser = () => ({type: UNSET_MY_USER})


//Epic
const fetchMyUserEpic = (action$) => {
  return action$.ofType(FETCH_MY_USER).switchMap(action =>{
    return Rx.Observable.fromPromise(api.get("my/user"))
      .map(response => doneFetchingMyUser(response))
  })
}

export default fetchMyUserEpic

import { combineReducers } from 'redux'
import Rx from 'rxjs/Rx'
import api from '../api'

export const USERS_FETCH = 'USERS_FETCH'
export const USERS_FETCHED = 'USERS_FETCHED'

export const fetchUsers = () => ({type: USERS_FETCH})
export const fetchedUsers = (response) => ({type: USERS_FETCHED, payload: response.data})

function listReducer(state=[], action){
  switch(action.type) {
    case USERS_FETCHED: {
      return action.payload
    }default: {
      return state
    }
  }
}

export const userReducer = combineReducers({
  list: listReducer
})

export const fetchUsersEpic = (action$) => {
  return action$.ofType(USERS_FETCH).switchMap((action) => {
    return Rx.Observable.fromPromise(api.get("/users"))
      .flatMap(response => [fetchedUsers(response)])
  })
}

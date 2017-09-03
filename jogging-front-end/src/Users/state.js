import { combineReducers } from 'redux'
import { push } from 'react-router-redux'
import Rx from 'rxjs/Rx'
import api from '../api'
import setErrorMessage from '../actions/setErrorMessage'
import { setSuccessMessage } from '../epics/successMessageEpic'

export const USERS_FETCH = 'USERS_FETCH'
export const USER_FETCH = 'USER_FETCH'

export const USER_FETCHED = 'USER_FETCHED'
export const USERS_FETCHED = 'USERS_FETCHED'
export const USER_CREATE  = 'SUBMIT_CREATE_USER'

export const USER_UPDATE = 'USER_UPDATE'
export const USER_DELETE = 'USER_DELETE'

export const fetchUsers = () => ({type: USERS_FETCH})
export const fetchUser = (userId) => ({type: USER_FETCH, payload: userId})
export const fetchedUser = (response) => ({type: USER_FETCHED, payload: response.data})
export const fetchedUsers = (response) => ({type: USERS_FETCHED, payload: response.data})
export const createUser = params => ({type: USER_CREATE, payload: params})
export const updateUser = (userId, params) => ({type: USER_UPDATE, payload: {params: params, userId: userId}})
export const deleteUser = (userId) => ({type: USER_DELETE, payload: userId})

function listReducer(state=[], action){
  switch(action.type) {
    case USERS_FETCHED: {
      return action.payload
    }default: {
      return state
    }
  }
}

function selectedReducer(state=null, action){
  switch(action.type) {
    case USER_FETCHED: {
      return action.payload
    }default: {
      return state
    }
  }
}

export const userReducer = combineReducers({
  list: listReducer,
  selected: selectedReducer
})

export const fetchUsersEpic = (action$) => {
  return action$.ofType(USERS_FETCH).switchMap((action) => {
    return Rx.Observable.fromPromise(api.get("/users"))
      .flatMap(response => [fetchedUsers(response)])
  })
}

export const fetchUserEpic = (action$) => {
  return action$.ofType(USER_FETCH).switchMap((action) => {
    return Rx.Observable.fromPromise(api.get(`/users/${action.payload}`))
      .flatMap(response => [fetchedUser(response)])
  })
}

export const createUserEpic = (action$) => {
  return action$.ofType(USER_CREATE).switchMap(action =>{
    return Rx.Observable.fromPromise(
      api.post('/register', {user: action.payload})
    ).flatMap(response => [push('/'), setErrorMessage(null), setSuccessMessage("User created")]
    ).catch(error => Rx.Observable.of(setErrorMessage(error)))
  })
}

export const updateUserEpic = (action$) => {
  return action$.ofType(USER_UPDATE).switchMap(action =>{
    return Rx.Observable.fromPromise(
      api.put(`/users/${action.payload.userId}`, {user: action.payload.params})
    ).flatMap(response => [push('/'), setErrorMessage(null), setSuccessMessage("User updated")]
    ).catch(error => Rx.Observable.of(setErrorMessage(error)))
  })
}

export const deleteUserEpic = (action$) => {
  return action$.ofType(USER_DELETE).switchMap(action =>{
    return Rx.Observable.fromPromise(
      api.delete(`/users/${action.payload}`)
    ).flatMap(response => [fetchUsers(), setSuccessMessage("User deleted")]
    ).catch(error => Rx.Observable.of(setErrorMessage(error)))
  })
}



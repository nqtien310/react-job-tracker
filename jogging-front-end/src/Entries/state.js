import Rx from 'rxjs/Rx'
import api from '../api'
import { combineReducers } from 'redux'
import { push } from 'react-router-redux'
import setErrorMessage from '../actions/setErrorMessage.js'
import {reset} from 'redux-form'
//constants
export const ENTRY_FORM_CREATE = 'ENTRY_FORM_CREATE'
export const ENTRY_FORM_EDIT   = 'ENTRY_FORM_EDIT'
export const ENTRY_FORM_HIDE   = 'ENTRY_FORM_HIDE'
export const ENTRY_DELETE      = 'ENTRY_DELETE'
export const ENTRY_CREATE      = 'ENTRY_CREATE'
export const ENTRY_UPDATE      = 'ENTRY_UPDATE'
export const ENTRIES_FETCH     = 'ENTRIES_FETCH'
export const ENTRIES_FETCHED   = 'ENTRIES_FETCHED'

//actions
export const deleteEntry = (userId, entryId) => {
  return {
    type: ENTRY_DELETE,
    payload:{
      userId: userId,
      id: entryId
    }
  }
}

export const fetchEntries = (userId) => ({type: ENTRIES_FETCH, payload: userId})
export const showCreateForm = () => ({type: ENTRY_FORM_CREATE})
export const showEditForm = (entry) => ({type: ENTRY_FORM_EDIT, payload: entry})
export const hideForm = (entry) => ({type: ENTRY_FORM_HIDE})
export const createEntry = (userId, params) => {
  return {
    type: ENTRY_CREATE,
    payload: {
      userId: userId,
      params: params
    }
  }
}

export const updateEntry = (userId, id, params) => {
  return {
    type: ENTRY_UPDATE,
    payload: {
      userId: userId,
      id: id,
      params: params
    }
  }
}

export const fetchedEntries = (response) => {
  return {
    type: ENTRIES_FETCHED,
    payload: response.data
  }
}

//reducers
function listReducer(state=[], action){
  switch(action.type){
    case ENTRIES_FETCHED: {
      return action.payload
    }default: {
      return state
    }
  }
}

function formReducer(state={}, action){
  switch(action.type){
    case ENTRY_FORM_CREATE: {
      return {action: 'create'}
    }case ENTRY_FORM_EDIT: {
      return {action: 'edit', editing: action.payload}
    }case ENTRY_FORM_HIDE: {
      return {}
    }default: {
      return state
    }
  }
}

export const entryReducer = combineReducers({
  list: listReducer,
  form: formReducer
})

//Epics

export const deleteEntryEpic = (action$) => {
  return action$.ofType(ENTRY_DELETE).switchMap( action => {
    return Rx.Observable.fromPromise(
      api.delete(`users/${action.payload.userId}/entries/${action.payload.id}`)
    ).flatMap(response => [fetchEntries(action.payload.userId), hideForm()])
  })
}

export const updateEntryEpic = (action$) => {
  return action$.ofType(ENTRY_UPDATE).switchMap( action => {
    return Rx.Observable.fromPromise(
      api.put(`users/${action.payload.userId}/entries/${action.payload.id}`, action.payload.params)
    ).flatMap(response => [fetchEntries(action.payload.userId), hideForm()])
  })
}

export const fetchEntriesEpic = (action$) => {
  return action$.ofType(ENTRIES_FETCH).switchMap( action => {
    return Rx.Observable.fromPromise(
      api.get(`users/${action.payload}/entries`)
    ).map(response => fetchedEntries(response))
  })
}

export const createEntryEpic = (action$) => {
  return action$.ofType(ENTRY_CREATE).switchMap( action => {
    return Rx.Observable.fromPromise(
      api.post(`users/${action.payload.userId}/entries`, action.payload.params)
    ).flatMap(() => [fetchEntries(action.payload.userId), hideForm()]
    ).catch(error => Rx.Observable.of(setErrorMessage(error)))
  })
}


//https://github.com/redux-observable/redux-observable/tree/master/examples/navigation/epics

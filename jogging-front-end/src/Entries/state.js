import Rx from 'rxjs/Rx'
import api from '../api'
import { combineReducers } from 'redux'
import { push } from 'react-router-redux'
import setErrorMessage from '../actions/setErrorMessage.js'
import {reset} from 'redux-form'
//constants
export const ENTRY_FORM_CREATE = 'ENTRY_FORM_CREATE'
export const ENTRY_FORM_EDIT   = 'ENTRY_FORM_EDIT'
export const ENTRY_DELETE      = 'ENTRY_DELETE'
export const ENTRY_CREATE      = 'ENTRY_CREATE'
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

export const createEntry = (userId, params) => {
  return {
    type: ENTRY_CREATE,
    payload: {
      userId: userId,
      params: params
    }
  }
}

export const fetchedEntries = (response) => {
  console.log("??????")
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

function formActionReducer(state=null, action){
  switch(action.type){
    case ENTRY_FORM_CREATE: {
      return ENTRY_FORM_CREATE
    }case ENTRY_FORM_EDIT: {
      return ENTRY_FORM_EDIT
    }default: {
      return state
    }
  }
}

export const entryReducer = combineReducers({
  list: listReducer,
  formAction: formActionReducer
})

//Epics

export const deleteEntryEpic = (action$) => {
  return action$.ofType(ENTRY_DELETE).switchMap( action => {
    return Rx.Observable.fromPromise(
      api.delete(`users/${action.payload.userId}/entries/${action.payload.id}`)
    ).map(response => fetchEntries(action.payload.userId))
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
    ).flatMap(() => [fetchEntries(action.payload.userId), reset("entry")]
    ).catch(error => Rx.Observable.of(setErrorMessage(error)))
  })
}


//https://github.com/redux-observable/redux-observable/tree/master/examples/navigation/epics

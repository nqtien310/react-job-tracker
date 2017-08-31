import Rx from 'rxjs/Rx'
import api from '../api'
import { fetchEntries } from './fetchEntriesEpic'

export function entriesReducer(state=[], action){
  switch(action.type){
    case DONE_FETCHING_ENTRIES: {
      return action.payload
    }default: {
      return state
    }
  }
}

export const DELETE_ENTRY = 'DELETE_ENTRY'
export const DONE_FETCHING_ENTRIES = 'DONE_FETCHING_ENTRIES'
export const deleteEntry = (userId, entryId) => {
  return {
    type: DELETE_ENTRY,
    payload:{
      userId: userId,
      id: entryId
    }
  }
}

export const doneFetchingEntries = (response) => {
  return {
    type: DONE_FETCHING_ENTRIES,
    payload: response.data
  }
}

export const deleteEntryEpic = (action$) => {
  return action$.ofType(DELETE_ENTRY).switchMap( action => {
    return Rx.Observable.fromPromise(
      api.delete(`users/${action.payload.userId}/entries/${action.payload.id}`)
    ).map(response => fetchEntries(action.payload.userId))
  })
}

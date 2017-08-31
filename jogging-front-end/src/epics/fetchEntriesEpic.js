import Rx from 'rxjs/Rx'
import api from '../api'

export function entriesReducer(state=[], action){
  switch(action.type){
    case DONE_FETCHING_ENTRIES: {
      return action.payload
    }default: {
      return state
    }
  }
}

export const FETCH_ENTRIES = 'FETCH_ENTRIES'
export const DONE_FETCHING_ENTRIES = 'DONE_FETCHING_ENTRIES'
export const fetchEntries = (userId) => ({type: FETCH_ENTRIES, payload: userId})

export const doneFetchingEntries = (response) => {
  return {
    type: DONE_FETCHING_ENTRIES,
    payload: response.data
  }
}

export const fetchEntriesEpic = (action$) => {
  return action$.ofType(FETCH_ENTRIES).switchMap( action => {
    return Rx.Observable.fromPromise(
      api.get(`users/${action.payload}/entries`)
    ).map(response => doneFetchingEntries(response))
  })
}

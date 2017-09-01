import Rx from 'rxjs/Rx'
import api from '../api'
import { fetchEntries } from './fetchEntriesEpic'
import setErrorMessage from '../actions/setErrorMessage.js'
import { push } from 'react-router-redux'

export const CREATE_ENTRY = 'CREATE_ENTRY'
export const DONE_CREATING_ENTRIES = 'DONE_CREATING_ENTRIES'

export const createEntry = (userId, params) => {
  return {
    type: CREATE_ENTRY,
    payload: {
      userId: userId,
      params: params
    }
  }
}


export const createEntryEpic = (action$) => {
  return action$.ofType(CREATE_ENTRY).switchMap( action => {
    return Rx.Observable.fromPromise(
      api.post(`users/${action.payload.userId}/entries`, action.payload.params)
    ).flatMap(() => Rx.Observable.merge(
      Rx.Observable.of(fetchEntries(action.payload.userId)),
      Rx.Observable.timer(2000).map(() => push('/'))
    )).catch(error => Rx.Observable.of(setErrorMessage(error)))
  })
}

//https://github.com/redux-observable/redux-observable/tree/master/examples/navigation/epics

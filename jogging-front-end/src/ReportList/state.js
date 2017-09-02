import Auth from '../auth'
import api from '../api'
import Rx from 'rxjs/Rx'
import setErrorMessage from '../actions/setErrorMessage.js'
import { combineReducers } from 'redux'

export const REPORTS_FETCH = 'REPORTS_FETCH'
export const REPORTS_FETCHED = 'REPORTS_FETCHED'

export const fetchReports = (userId) => {
  return {
    type: REPORTS_FETCH,
    payload:{
      userId: userId
    }
  }
}

export const fetchedReports = (response) => {
  return {
    type: REPORTS_FETCHED,
    payload: response.data
  }
}

const listReducer = (state=[], action) => {
  switch(action.type){
    case REPORTS_FETCHED: {
      return action.payload
    }default: {
      return state
    }
  }
}

export const reportReducer = combineReducers({
  list: listReducer
})

export const fetchReportsEpic = (action$) => {
  return action$.ofType(REPORTS_FETCH).switchMap((action) => {
    return Rx.Observable.fromPromise(
      api.get(`/users/${action.payload.userId}/weekly_summaries`)
    ).flatMap(response => [fetchedReports(response)])
  })
}

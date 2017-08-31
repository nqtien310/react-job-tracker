import { tryAuthenticate } from '../epics/authentication_epic'
import Auth from '../auth'
import 'rxjs/add/operator/switchMap';
import Rx from 'rxjs/Rx'
import api from '../api'
import setErrorMessage from '../actions/setErrorMessage.js'

export const LOGIN = 'LOGIN'
export const SETTOKEN = 'SETTOKEN'

export const SubmitLogin = params => ({type: LOGIN, payload: params})
export const setToken    = params => ({type: SETTOKEN, payload: params})

export const loginEpic = (action$) => {
  return action$.ofType(LOGIN).switchMap(action =>{
    return Rx.Observable.fromPromise(
      api.post('login', {user: action.payload})
    ).flatMap(response =>
        Rx.Observable.concat(
          Rx.Observable.of(setToken(response)),
          Rx.Observable.of(tryAuthenticate())
        )
      ).catch(error => Rx.Observable.of(setErrorMessage(error)))
  })
}


import { fetchMyUser } from '../epics/fetchMyUserEpic'
import Auth from '../auth'
import Rx from 'rxjs/Rx'
import api from '../api'
import setErrorMessage from '../actions/setErrorMessage'
import { setSuccessMessage } from '../epics/successMessageEpic'
import { push } from 'react-router-redux'

export const LOGIN  = 'LOGIN'
export const SETTOKEN = 'SETTOKEN'

export const submitLogin = params => ({type: LOGIN, payload: params})
export const setToken    = params => ({type: SETTOKEN, payload: params})


export const loginEpic = (action$) => {
  return action$.ofType(LOGIN).switchMap(action =>{
    return Rx.Observable.fromPromise(
      api.post('login', {user: action.payload})
    ).flatMap(response => [setToken(response), fetchMyUser(), push('/'), setErrorMessage(null), setSuccessMessage("Login successfully")]
    ).catch(error => Rx.Observable.of(setErrorMessage(error)))
  })
}


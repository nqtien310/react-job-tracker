import api from '../api'
import 'rxjs/add/operator/switchMap';
import Rx from 'rxjs/Rx'

const AUTHENTICATED = 'AUTHENTICATED'
const AUTHENTICATE  = 'AUTHENTICATE'

export const authenticated = user => ({type: AUTHENTICATED, payload: user})
export const tryAuthenticate = () => ({type: AUTHENTICATE})

const authenticationEpic = (action$) => {
  return action$.ofType(AUTHENTICATE).switchMap(action =>{
    return Rx.Observable.fromPromise(api.get("my/user"))
      .map(response => authenticated(response))
  })
}

export default authenticationEpic

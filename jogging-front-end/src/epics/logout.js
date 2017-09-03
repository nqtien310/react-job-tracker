import { unsetMyUser } from '../epics/fetchMyUserEpic'
import { push } from 'react-router-redux'
import { setSuccessMessage } from './successMessageEpic'

export const LOGOUT = 'LOGOUT'
export const logout      = params => ({type: LOGOUT})
export const clearToken  = params => ({type: CLEARTOKEN})
export const CLEARTOKEN = 'CLEARTOKEN'

export const logoutEpic = (action$) => {
  return action$.ofType(LOGOUT).flatMap(action =>{
    return [clearToken(), unsetMyUser(), push("/"), setSuccessMessage("Logged out")]
  })
}

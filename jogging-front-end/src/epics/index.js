import { combineEpics } from 'redux-observable';
import fetchMyUserEpic from './fetchMyUserEpic'
import { loginEpic } from '../Login/state'
import { logoutEpic } from './logout'

const rootEpic = combineEpics(
  fetchMyUserEpic,
  loginEpic,
  logoutEpic
);

export default rootEpic

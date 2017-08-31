import { combineEpics } from 'redux-observable';
import fetchMyUserEpic from './fetchMyUserEpic'
import { loginEpic } from '../Login/state'
import { logoutEpic } from './logout'
import { fetchEntriesEpic } from './fetchEntriesEpic.js'

const rootEpic = combineEpics(
  fetchMyUserEpic,
  loginEpic,
  logoutEpic,
  fetchEntriesEpic
);

export default rootEpic

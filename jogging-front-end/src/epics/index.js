import { combineEpics } from 'redux-observable';
import fetchMyUserEpic from './fetchMyUserEpic'
import { loginEpic } from '../Login/state'

const rootEpic = combineEpics(
  fetchMyUserEpic,
  loginEpic
);

export default rootEpic

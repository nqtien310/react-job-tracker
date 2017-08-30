import { combineEpics } from 'redux-observable';
import authenticationEpic from './authentication_epic'
import { loginEpic } from '../Login/state'

const rootEpic = combineEpics(
  authenticationEpic,
  loginEpic
);

export default rootEpic

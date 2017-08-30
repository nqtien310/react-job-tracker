import { combineEpics } from 'redux-observable';
import authenticationEpic from './authentication_epic'
const rootEpic = combineEpics(
  authenticationEpic
);

export default rootEpic

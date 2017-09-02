import { combineEpics } from 'redux-observable';
import fetchMyUserEpic from './fetchMyUserEpic'
import { loginEpic } from '../Login/state'
import { logoutEpic } from './logout'
import { fetchEntriesEpic, deleteEntryEpic, createEntryEpic } from '../Entries/state'

const rootEpic = combineEpics(
  fetchMyUserEpic,
  loginEpic,
  logoutEpic,
  fetchEntriesEpic,
  deleteEntryEpic,
  createEntryEpic
);

export default rootEpic

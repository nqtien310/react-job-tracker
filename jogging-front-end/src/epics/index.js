import { combineEpics } from 'redux-observable';
import fetchMyUserEpic from './fetchMyUserEpic'
import { loginEpic } from '../Login/state'
import { logoutEpic } from './logout'
import { fetchEntriesEpic } from './fetchEntriesEpic'
import { deleteEntryEpic } from './deleteEntryEpic'
import { createEntryEpic } from './createEntryEpic'

const rootEpic = combineEpics(
  fetchMyUserEpic,
  loginEpic,
  logoutEpic,
  fetchEntriesEpic,
  deleteEntryEpic,
  createEntryEpic
);

export default rootEpic

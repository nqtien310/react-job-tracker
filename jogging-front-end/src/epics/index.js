import { combineEpics } from 'redux-observable';
import fetchMyUserEpic from './fetchMyUserEpic'
import { loginEpic } from '../Login/state'
import { logoutEpic } from './logout'
import { updateEntryEpic, fetchEntriesEpic, deleteEntryEpic, createEntryEpic } from '../Entries/state'
import { fetchReportsEpic } from '../ReportList/state'

const rootEpic = combineEpics(
  fetchMyUserEpic,
  loginEpic,
  logoutEpic,
  fetchEntriesEpic,
  deleteEntryEpic,
  createEntryEpic,
  updateEntryEpic,
  fetchReportsEpic
);

export default rootEpic

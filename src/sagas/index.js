import {fork} from 'redux-saga/effects';
import {watchCreateEvent, watchFetchAllEvents, watchEventCreated} from './Event';

export default function* root() {
  yield [
    fork(watchCreateEvent),
    fork(watchFetchAllEvents),
    fork(watchEventCreated),
  ];
}

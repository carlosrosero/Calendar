import {fork} from 'redux-saga/effects';
import {watchCreateEvent, watchFetchEvent, watchFetchAllEvents, watchEventCreated} from './Event';

export default function* root() {
  yield [
    fork(watchCreateEvent),
    fork(watchFetchEvent),
    fork(watchFetchAllEvents),
    fork(watchEventCreated),
  ];
}

import {fork} from 'redux-saga/effects';
import {
  watchCreateEvent,
  watchUpdateEvent,
  watchFetchEvent,
  watchFetchAllEvents,
  watchEventCreated,
  watchEventUpdated,
} from './Event';

export default function* root() {
  yield [
    fork(watchCreateEvent),
    fork(watchUpdateEvent),
    fork(watchFetchEvent),
    fork(watchFetchAllEvents),
    fork(watchEventCreated),
    fork(watchEventUpdated),
  ];
}

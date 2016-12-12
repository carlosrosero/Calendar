import {fork} from 'redux-saga/effects';
import {
  watchCreateEvent,
  watchUpdateEvent,
  watchRemoveEvent,
  watchFetchAllEvents,
  watchEventCreated,
  watchEventUpdated,
} from './Event';

export default function* root() {
  yield [
    fork(watchCreateEvent),
    fork(watchUpdateEvent),
    fork(watchRemoveEvent),
    fork(watchFetchAllEvents),
    fork(watchEventCreated),
    fork(watchEventUpdated),
  ];
}

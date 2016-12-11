import {fork} from 'redux-saga/effects';
import {watchCreateEvent, watchFetchAllEvents} from './Event';

export default function* root() {
  yield [
    fork(watchCreateEvent),
    fork(watchFetchAllEvents),
  ];
}

import {take, call, fork} from 'redux-saga/effects';
import {Schema, arrayOf} from 'normalizr';
import {actionCreators, CREATE_EVENT, FETCH_ALL_EVENTS} from 'actions/Event';
import api from 'helpers/Api';
import {fetchEntity} from 'helpers/sagas';

export const schemas = {
  event: new Schema('events'),
};

const eventApi = {
  post: fetchEntity.bind(null, actionCreators.create, (data) => {
    return api.post({
      endpoint: 'events',
      schema: schemas.event,
      data,
    });
  }),
  get: fetchEntity.bind(null, actionCreators.fetchAll, () => {
    return api.get({
      endpoint: 'events',
      schema: arrayOf(schemas.event),
    });
  }),
};

export function* createEvent(eventData) {
  yield call(eventApi.post, eventData);
}

export function* fetchAllEvents() {
  yield call(eventApi.get);
}

export function* watchCreateEvent() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const eventData = yield take(CREATE_EVENT);
    yield fork(createEvent, eventData.data);
  }
}

export function* watchFetchAllEvents() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    yield take(FETCH_ALL_EVENTS);
    yield fork(fetchAllEvents);
  }
}

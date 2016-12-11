import {take, call, fork, put} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {Schema, arrayOf} from 'normalizr';
import {
  actionCreators,
  actionTypes as eventActionTypes,
  CREATE_EVENT,
  FETCH_EVENT,
  FETCH_ALL_EVENTS,
  UPDATE_EVENT,
} from 'actions/Event';
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
  put: fetchEntity.bind(null, actionCreators.update, (data) => {
    return api.put({
      endpoint: 'events',
      schema: schemas.event,
      data,
    });
  }),
  getAll: fetchEntity.bind(null, actionCreators.fetchAll, () => {
    return api.get({
      endpoint: 'events',
      schema: arrayOf(schemas.event),
    });
  }),
  getOne: fetchEntity.bind(null, actionCreators.fetch, (id) => {
    return api.get({
      endpoint: 'events',
      query: {id},
      schema: schemas.event,
    });
  }),
};


export function* createEvent(eventData) {
  yield call(eventApi.post, eventData);
}

export function* updateEvent(eventData) {
  yield call(eventApi.put, eventData);
}

export function* fetchAllEvents() {
  yield call(eventApi.getAll);
}

export function* fetchEvent(id) {
  yield call(eventApi.getOne, id);
}


export function* watchCreateEvent() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const eventAction = yield take(CREATE_EVENT);
    yield fork(createEvent, eventAction.data);
  }
}

export function* watchUpdateEvent() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const eventAction = yield take(UPDATE_EVENT);
    yield fork(updateEvent, eventAction.data);
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

export function* watchFetchEvent() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {id} = yield take(FETCH_EVENT);
    yield fork(fetchEvent, id);
  }
}

export function* watchEventCreated() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const action = yield take(eventActionTypes.create.SUCCESS);
    if (action.redirectToCalendar) {
      yield put(push('/calendar'));
    }
  }
}

export function* watchEventUpdated() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    yield take(eventActionTypes.update.SUCCESS);
    yield put(push('/calendar'));
  }
}

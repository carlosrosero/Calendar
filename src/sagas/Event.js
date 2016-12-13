import {take, call, fork, put} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {Schema, arrayOf} from 'normalizr';
import {
  actionCreators,
  actionTypes as eventActionTypes,
  CREATE_EVENT,
  REMOVE_EVENT,
  FETCH_ALL_EVENTS,
  UPDATE_EVENT,
} from 'actions/Event';
import api from 'helpers/Api';
import {apiRequest} from 'helpers/Sagas';

export const schemas = {
  event: new Schema('events'),
};

const eventApi = {
  post: apiRequest.bind(null, actionCreators.create, (action) => {
    return api.post({
      endpoint: 'events',
      schema: schemas.event,
      data: action.data,
    });
  }),
  put: apiRequest.bind(null, actionCreators.update, (data) => {
    return api.put({
      endpoint: 'events',
      schema: schemas.event,
      data,
    });
  }),
  getAll: apiRequest.bind(null, actionCreators.fetchAll, (query) => {
    return api.get({
      endpoint: 'events',
      schema: arrayOf(schemas.event),
      query,
    });
  }),
  remove: apiRequest.bind(null, actionCreators.remove, (id) => {
    return api.delete({
      endpoint: 'events',
      id,
    });
  }),
};


export function* createEvent(data, redirectToCalendar) {
  yield call(eventApi.post, {data, redirectToCalendar});
}

export function* updateEvent(eventData) {
  yield call(eventApi.put, eventData);
}

export function* fetchAllEvents(query) {
  yield call(eventApi.getAll, query);
}

export function* removeEvent(id) {
  yield call(eventApi.remove, id);
}


export function* watchCreateEvent() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {data, redirectToCalendar} = yield take(CREATE_EVENT);
    yield fork(createEvent, data, redirectToCalendar);
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
    const {query} = yield take(FETCH_ALL_EVENTS);
    yield fork(fetchAllEvents, query);
  }
}

export function* watchRemoveEvent() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {id} = yield take(REMOVE_EVENT);
    yield fork(removeEvent, id);
  }
}

export function* watchEventCreated() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const action = yield take(eventActionTypes.create.SUCCESS);
    if (action.originalAction.redirectToCalendar) {
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

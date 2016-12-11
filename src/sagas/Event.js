import {take, call, fork} from 'redux-saga/effects';
import {actionCreators, CREATE_EVENT} from 'actions/Event';
import api from 'helpers/Api';
import {fetchEntity} from 'helpers/sagas';

const eventApi = {
  post: fetchEntity.bind(null, actionCreators.create, (data) => {
    // return callApi('profile', schemas.user);
    return api.post({
      endpoint: 'events',
      data,
    });
  }),
};

export function* createEvent(eventData) {
  yield call(eventApi.post, eventData);
}

export function* watchCreateEvent() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const eventData = yield take(CREATE_EVENT);

    yield fork(createEvent, eventData.data);
  }
}

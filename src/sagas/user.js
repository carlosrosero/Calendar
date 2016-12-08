import {take, call, fork, select} from 'redux-saga/effects';
import {actionCreators, LOAD_LOGGED_USER/* , UPDATE_LOGGED_USER, CHANGE_LOGGED_USER_PASSWORD */} from 'actions/user';
import {Schema/* arrayOf */} from 'normalizr';
import callApi from 'helpers/api';
import selectors from 'reducers/selectors';
import {fetchEntity} from 'helpers/sagas';

export const schemas = {
  user: new Schema('users'),
};

const api = {
  user: {
    fetch: fetchEntity.bind(null, actionCreators.loggedUser.fetch, () => {
      return callApi('profile', schemas.user);
    }),
    // update: fetchEntity.bind(null, actionCreators.loggedUser.update, ({data}) => {
    //   return callApi('/api/users', schemas.user, {method: 'PUT', data});
    // }),
    // changePassword: fetchEntity.bind(null, actionCreators.loggedUser.changePassword, ({data}) => {
    //   return callApi('/api/users/password', null, {method: 'POST', data});
    // }),
  },
};

// load user unless it is cached
export function* loadLoggedUser() {
  const loadedUser = yield select(selectors.getUser);

  if (!loadedUser) {
    yield call(api.user.fetch);
  }
}

// function* updateLoggedUser(data) {
//   yield call(api.user.update, {data});
// }
//
// function* changePassword(data) {
//   yield call(api.user.changePassword, {data});
// }

export function* watchGetLoggedUser() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    yield take(LOAD_LOGGED_USER);

    yield fork(loadLoggedUser);
  }
}

// export function* watchUpdateLoggedUser() {
//   /* eslint-disable no-constant-condition */
//   while (true) {
//   /* eslint-enable no-constant-condition */
//     const {data} = yield take(UPDATE_LOGGED_USER);
//
//     yield fork(updateLoggedUser, data);
//   }
// }
//
// export function* watchChangeUserPassword() {
//   /* eslint-disable no-constant-condition */
//   while (true) {
//   /* eslint-enable no-constant-condition */
//     const {data} = yield take(CHANGE_LOGGED_USER_PASSWORD);
//
//     yield fork(changePassword, data);
//   }
// }

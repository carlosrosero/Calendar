import {take, call, fork} from 'redux-saga/effects';
import {
  actionTypes as loginActionTypes,
  actionCreators,
  SUBMIT_LOGIN_FORM,
  // SUBMIT_SIGN_OUT,
  // SUBMIT_REGISTER_FORM,
} from 'actions/login';
import callApi from 'helpers/api';
import {fetchEntity} from 'helpers/sagas';
import {schemas as userSchemas, loadLoggedUser} from './user';

const api = {
  login: {
    post: fetchEntity.bind(null, actionCreators.login.post, (data) => {
      const loginCreds = {
        grant_type: 'admin-password',
        client_id: 'imd-admin',
        client_secret: 'not-really-a-secret',
        ...data,
      };
      return callApi('auth', null, {method: 'POST', data: loginCreds});
    }),
  },
  register: {
    post: fetchEntity.bind(null, actionCreators.register.post, (data) => {
      return callApi('auth/signup', userSchemas.user, {method: 'POST', data});
    }),
  },
  signOut: {
    post: fetchEntity.bind(null, actionCreators.signOut.post, () => {
      return callApi('auth/signout', userSchemas.user, {method: 'POST'});
    }),
  },
};

function* submitLoginRequest(username, password) {
  yield call(api.login.post, {username, password});
}

// function* submitRegisterRequest(data) {
//   yield call(api.register.post, data);
// }
//
// function* submitSignOutRequest() {
//   yield call(api.signOut.delete);
// }

export function* watchSubmitLoginForm() {
  /* eslint-disable no-constant-condition */
  while (true) {
  /* eslint-enable no-constant-condition */
    const {username, password} = yield take(SUBMIT_LOGIN_FORM);

    yield fork(submitLoginRequest, username, password);

    const {response} = yield take(loginActionTypes.login.post.SUCCESS);
    console.log('response', response);
    localStorage.setItem('auth', JSON.stringify(response));
    yield fork(loadLoggedUser);
  }
}

// export function* watchSubmitRegisterForm() {
//   /* eslint-disable no-constant-condition */
//   while (true) {
//   /* eslint-enable no-constant-condition */
//     const {data} = yield take(SUBMIT_REGISTER_FORM);
//
//     yield fork(submitRegisterRequest, data);
//   }
// }
//
// export function* watchSubmitSignOut() {
//   /* eslint-disable no-constant-condition */
//   while (true) {
//   /* eslint-enable no-constant-condition */
//     yield take(SUBMIT_SIGN_OUT);
//
//     yield fork(submitSignOutRequest);
//   }
// }

import {fork} from 'redux-saga/effects';
import {watchGetLoggedUser/* , watchUpdateLoggedUser, watchChangeUserPassword */} from './user';
import {watchSubmitLoginForm/* , watchSubmitSignOut, watchSubmitRegisterForm */} from './login';

export default function* root() {
  yield [
    fork(watchGetLoggedUser),
    // fork(watchUpdateLoggedUser),
    // fork(watchChangeUserPassword),
    fork(watchSubmitLoginForm),
    // fork(watchSubmitRegisterForm),
    // fork(watchSubmitSignOut),
  ];
}

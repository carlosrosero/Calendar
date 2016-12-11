import {fork} from 'redux-saga/effects';
import {watchCreateEvent/* , watchUpdateLoggedUser, watchChangeUserPassword */} from './Event';
// import {watchSubmitLoginForm/* , watchSubmitSignOut, watchSubmitRegisterForm */} from './login';

export default function* root() {
  yield [
    fork(watchCreateEvent),
    // fork(watchSubmitLoginForm),
  ];
}

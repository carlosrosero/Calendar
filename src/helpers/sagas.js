import {put, call} from 'redux-saga/effects';

// TODO: change comments
// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
export function* fetchEntity(entity, apiFn, data) {
  try {
    yield put(entity.request(data));
    const {response, error, statusCode} = yield call(apiFn, data);
    console.log('response, error, statusCode', response, error, statusCode);
    if (response) {
      yield put(entity.success(data, response));
    } else {
      yield put(entity.failure(data, error, statusCode));
    }
  } catch (error) {
    console.log('error', error);
    yield put(entity.failure(data, error));
  }
}

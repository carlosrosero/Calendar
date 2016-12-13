import {put, call} from 'redux-saga/effects';

// resuable subroutine that makes async requests to API and responds with success/failure action
export function* apiRequest(actionCreators, apiFn, data) {
  try {
    yield put(actionCreators.request(data));
    const {response, error, statusCode} = yield call(apiFn, data);
    // console.log('response, error, statusCode', response, error, statusCode);
    if (response) {
      yield put(actionCreators.success(data, response));
    } else {
      yield put(actionCreators.failure(data, error, statusCode));
    }
  } catch (error) {
    console.log('error', error);
    yield put(actionCreators.failure(data, error));
  }
}

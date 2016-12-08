import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';
import requests from './requests';
import entities from './entities';

const rootReducer = combineReducers({
  entities,
  requests,
  auth,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;

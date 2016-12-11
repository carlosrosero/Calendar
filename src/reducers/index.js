import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import requests from './requests';
import entities from './entities';

const rootReducer = combineReducers({
  entities,
  requests,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from 'store/configureStore';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import rootSaga from './sagas';
import routes from './routes';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

store.runSaga(rootSaga);

// Render the React application to the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
console.log(document.getElementById('app'));  

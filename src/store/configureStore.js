import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import createLogger from 'redux-logger';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import rootReducer from 'reducers';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  let middleware = applyMiddleware();
  let enhancer;

  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable import/no-extraneous-dependencies */
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    const middlewares = [require('redux-immutable-state-invariant')()];
    /* eslint-enable import/no-extraneous-dependencies */
    const logger = createLogger({
      collapsed: true,
    });

    middleware = applyMiddleware(...middlewares);
    enhancer = compose(
      middleware,
      applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory), logger),
    );
  } else {
    enhancer = compose(middleware, applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory)));
  }

  const store = createStore(rootReducer, initialState, enhancer);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => {
    store.dispatch(END);
  };
  return store;
}

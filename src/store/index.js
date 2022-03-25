import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

import rootSaga from './saga';
import { combinedReducers } from './initreducer';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(
  combinedReducers,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

export default store
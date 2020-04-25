import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import personalization from '../store/models/Personalization';
import browse from '../store/models/Browse';
import video from '../store/models/Video';
import global from '../store/models/Global';
import player from '../store/models/Player';

export const history = createBrowserHistory();
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

// eslint-disable-next-line
// @ts-ignore
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const reducers = combineReducers({
  personalization,
  browse,
  video,
  global,
  player,
  router: connectRouter(history)
});

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(reducers, composedEnhancers);

export default store;

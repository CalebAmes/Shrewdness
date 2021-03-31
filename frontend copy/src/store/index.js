import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import channelMessages from './channelMessages';
import channels from './channels';
import directMessages from './directMessages';
import groups from './groups';
import notifications from './notifications';
import userGroups from './userGroups';

const rootReducer = combineReducers({
  session,
  channelMessages,
  channels,
  directMessages,
  groups,
  notifications,
  userGroups,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

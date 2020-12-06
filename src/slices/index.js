import { combineReducers } from 'redux';

import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import modalReducer from './modalsSlice';

export default combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  modals: modalReducer,
});

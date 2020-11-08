import { combineReducers } from 'redux';

import messagesReducer from '../slices/messagesSlice';
import channelsReducer from '../slices/channelsSlice';
import modalReducer from '../slices/modalsSlice';

export default combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  modals: modalReducer,
});

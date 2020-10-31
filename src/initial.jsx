import React from 'react';
import ReactDom from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import App from './components/App';
import { setUserName, getUserName, UserContext } from './utils';
import rootReducer from './reducers';
import { addMessage, initMessages } from './features/messages/messagesSlice';
import { addChannel, initChannels } from './features/channels/channelsSlice';

export default ({ channels, currentChannelId, messages }) => {
  if (!getUserName()) {
    setUserName();
  }

  const userName = getUserName();

  const store = configureStore({
    reducer: rootReducer,
  });

  store.dispatch(initMessages(messages));
  store.dispatch(initChannels(channels));

  const socket = io();
  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(addMessage(attributes));
  });
  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(addChannel(attributes));
  });

  const container = document.querySelector('.container');
  ReactDom.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App channels={channels} currentChannelId={currentChannelId} messages={messages} />
      </UserContext.Provider>
    </Provider>,
    container,
  );
};

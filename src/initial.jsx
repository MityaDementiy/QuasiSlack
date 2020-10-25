import React from 'react';
import ReactDom from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import App from './components/App';
import { setUserName, getUserName, UserContext } from './utils';
import rootReducer from './reducers';
import { addMessage } from './features/messages/messagesSlice';

export default ({ channels, currentChannelId, messages }) => {
  if (!getUserName()) {
    setUserName();
  }

  const userName = getUserName();

  const store = configureStore({
    reducer: rootReducer,
  });

  const socket = io();
  socket.on('newMessage', (reply) => {
    const message = reply.data.attributes;
    store.dispatch(addMessage({ data: message }));
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

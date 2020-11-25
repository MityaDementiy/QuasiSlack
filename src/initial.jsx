import React from 'react';
import ReactDom from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import Rollbar from 'rollbar';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import App from './components/App';
import { setUserName, getUserName } from './utils';
import rootReducer from './reducers';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './slices/channelsSlice';
import en from './locales/en';
import UserContext from './Context';

export default ({ channels, currentChannelId, messages }) => {
  if (!getUserName()) {
    setUserName();
  }

  const userName = getUserName();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      channels: {
        channels,
        currentChannelId,
      },
      messages,
    },
  });

  const socket = io();
  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(addMessage(attributes));
  });
  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(addChannel(attributes));
  });
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(removeChannel(data.id));
  });
  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(renameChannel(attributes));
  });

  const rollbarToken = process.env.ROLLBAR_TOKEN;

  // eslint-disable-next-line no-new
  new Rollbar({
    accessToken: rollbarToken,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  i18n
    .use(initReactI18next)
    .init({
      lng: 'en',
      debug: true,
      resources: {
        en,
      },
    });

  const container = document.getElementById('chat');
  ReactDom.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    container,
  );
};

import React from 'react';
import ReactDom from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/App';
import { setUserName, getUserName } from './utils';
import rootReducer from './reducers';

if (!getUserName()) {
  setUserName();
}

const userName = getUserName();
console.log(userName);

const UserContext = React.createContext();

const store = configureStore({
  reducer: rootReducer,
});

export default (channels) => {
  const container = document.querySelector('.container');
  ReactDom.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App channels={channels} />
      </UserContext.Provider>
    </Provider>,
    container,
  );
};

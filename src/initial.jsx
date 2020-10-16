import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import { setUserName, getUserName } from './utils';

setUserName();
const userName = getUserName();
console.log(userName);

const UserContext = React.createContext();

export default (channels) => {
  const container = document.querySelector('.container');
  ReactDom.render(
    <UserContext.Provider value={userName}>
      <App channels={channels} />
    </UserContext.Provider>, container);
};
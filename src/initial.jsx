import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

export default (channels) => {
  const container = document.querySelector('.container');
  ReactDom.render(<App channels={channels} />, container);
};
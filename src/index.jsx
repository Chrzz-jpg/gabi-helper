import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import App from './App';
import './index.scss';

ReactDOM.render(
  <App store={new Store()} />,
  document.getElementById('root')
);

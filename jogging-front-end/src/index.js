import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Router from './Router'

ReactDOM.render(
  <App>
    <Router />
  </App>
, document.getElementById('root'));

registerServiceWorker();

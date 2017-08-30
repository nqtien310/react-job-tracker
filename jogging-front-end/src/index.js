import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './auth'
import registerServiceWorker from './registerServiceWorker';
import Api from './api'
import Router from './Router'

ReactDOM.render(
  <App>
    <Router />
  </App>
, document.getElementById('root'));

registerServiceWorker();

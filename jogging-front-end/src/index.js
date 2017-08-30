import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './auth'
import registerServiceWorker from './registerServiceWorker';
import Api from './api'

//Api.post("login",
  //{user: {
    //email: 'nqtien310@gmail.com',
    //password: 'Kieuthuy123'}}
//).then(response => {
  //let token = response.data.token
  //Auth.setToken(token)
  //Api.post("my/entries", {entry: {date:'2017-01-01'}})
//})


//Auth.clearToken()
//Api.post("my/entries", {entry: {date:'2017-01-01'}})
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

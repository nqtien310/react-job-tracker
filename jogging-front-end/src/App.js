import React from 'react';
import { Provider } from 'react-redux'
import { store, browserHistory } from './store'
import { Router } from 'react-router'
import { fetchMyUser } from './epics/fetchMyUserEpic'
import auth from './auth'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    if(auth.isLogin()){
      store.dispatch(fetchMyUser())
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {this.props.children}
        </Router>
      </Provider>
    )
  }
}

export default App

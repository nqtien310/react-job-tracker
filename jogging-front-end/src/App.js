import React from 'react';
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { TryAuthenticate } from './epics/authentication_epic'
import auth from './auth'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    if(auth.isLogin()){
      store.dispatch(TryAuthenticate())
    }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {this.props.children}
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App

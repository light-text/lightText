import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {ToastProvider} from 'react-toast-notifications'

// establishes socket connection
import './socket'

ReactDOM.render(
  <ToastProvider autoDismissTimeout={2000} placement="top-center">
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </ToastProvider>,
  document.getElementById('app')
)

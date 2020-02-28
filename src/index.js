import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { configureStore, history } from './store/index'

const store = configureStore()

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root')
)

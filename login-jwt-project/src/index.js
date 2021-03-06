import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import AuthReducer from './reducers/AuthReducer'
import RegisterReducer from './reducers/RegisterReducer'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'

const store = createStore(combineReducers({
    AuthReducer, RegisterReducer
}));

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode></Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

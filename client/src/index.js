import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import store from './allReducers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);


reportWebVitals();
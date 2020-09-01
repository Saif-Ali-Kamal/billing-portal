import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import ReactGA from 'react-ga';
import { makeServer } from "./mirage/server";
import './index.css';
import { performOnAppLoadActions, markSetupComplete } from './utils';

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize('UA-104521884-3');
}

if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_ENABLE_MOCK) {
  makeServer();
}

// Perform things to be done on load/reload
performOnAppLoadActions()
  .finally(() => markSetupComplete())

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initializeFirebase } from './push-notifications.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SplashPage from './spashPage.js';

import authentication from 'react-azure-adb2c';

import config from './config.js';

authentication.initialize({
    tenant: `${process.env.REACT_APP_AUTHENTICATION_TENANT}`,
    signInPolicy: `${process.env.REACT_APP_AUTHENTICATION_SIGN_IN_POLICY}`,
    applicationId: `${process.env.REACT_APP_AUTHENTICATION_APPLICATION_ID}`,
    cacheLocation: `${process.env.REACT_APP_AUTHENTICATION_CACHE_LOCATION}`,
    scopes: [
      `${process.env.REACT_APP_AUTHENTICATION_SCOPE}`
    ],
    postLogoutRedirectUri: `${process.env.REACT_APP_AUTHENTICATION_POST_LOGOUT_REDIRECT_URI}`
});

ReactDOM.render(
  <div id="main-container">
    <Router>
      <div>
        <Route path="/" exact component={SplashPage}/>
        <Route path="/activity" component={authentication.required(App)} />
      </div>
    </Router>
  </div>,
  document.getElementById('root'));


if (config.notificationsEnabled) {
  initializeFirebase();
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

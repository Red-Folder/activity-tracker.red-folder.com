import React from 'react';

import './splashPage.css';

import logo from './rfc-folder-logo.png';

const SplashPage = () => (
    <div id='splash-page'>
        <img src={logo} alt="RFC Logo" />
        <a class='btn btn-primary' href='/activity'>Login</a>
    </div>
);
export default SplashPage;
import React from 'react';

import './splashPage.css';

import logo from './rfc-folder-logo.png';

const SplashPage = () => (
    <div id='splash-page'>
        <div>
            <img id='splash-page-logo' src={logo} alt="RFC Logo" class="img-circle" />
        </div>
        <h1>RFC Activity Approval</h1>
        <p>
            This is a private system intended for use by Red Folder Consultancy Ltd staff only.
        </p>
        <p>
            Those with authorised credentials should use the login button below.
        </p>
        <div>
            <a class='btn btn-primary' href='/activity'>Login</a>
        </div>
    </div>
);
export default SplashPage;